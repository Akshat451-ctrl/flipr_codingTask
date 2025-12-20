import fs from 'fs/promises'
import path from 'path'

import Project from '../models/Project.js'
import { cropAndResizeImage } from '../utils/imageCropper.js'

function ok(res, message, data, code = 200) {
  return res.status(code).json({ status: 'success', message, data })
}

async function listProjects(req, res) {
  const projects = await Project.find().sort({ createdAt: -1 })
  return ok(res, 'Projects fetched.', projects)
}

async function createProject(req, res) {
  const { name, description } = req.body

  if (!req.file) {
    return res.status(400).json({ status: 'fail', message: 'Project image is required.', data: null })
  }

  const inputPath = req.file.path
  const outputDir = path.join(process.cwd(), 'uploads', 'projects')

  const { relativePath } = await cropAndResizeImage({
    inputPath,
    outputDir,
    baseName: name || 'project',
    width: 450,
    height: 350,
  })

  await fs.unlink(inputPath).catch(() => null)

  const project = await Project.create({
    name,
    description,
    imagePath: `/${relativePath}`,
  })

  return ok(res, 'Project created.', project, 201)
}

async function updateProject(req, res) {
  const { id } = req.params
  const { name, description } = req.body

  const project = await Project.findById(id)
  if (!project) {
    return res.status(404).json({ status: 'fail', message: 'Project not found.', data: null })
  }

  if (typeof name === 'string') project.name = name
  if (typeof description === 'string') project.description = description

  if (req.file) {
    const inputPath = req.file.path
    const outputDir = path.join(process.cwd(), 'uploads', 'projects')

    const { relativePath } = await cropAndResizeImage({
      inputPath,
      outputDir,
      baseName: project.name || 'project',
      width: 450,
      height: 350,
    })

    await fs.unlink(inputPath).catch(() => null)

    const previousPath = project.imagePath ? path.join(process.cwd(), project.imagePath.replace(/^\//, '')) : null
    if (previousPath) {
      await fs.unlink(previousPath).catch(() => null)
    }

    project.imagePath = `/${relativePath}`
  }

  await project.save()
  return ok(res, 'Project updated.', project)
}

async function deleteProject(req, res) {
  const { id } = req.params

  const project = await Project.findById(id)
  if (!project) {
    return res.status(404).json({ status: 'fail', message: 'Project not found.', data: null })
  }

  if (project.imagePath) {
    const absolutePath = path.join(process.cwd(), project.imagePath.replace(/^\//, ''))
    await fs.unlink(absolutePath).catch(() => null)
  }

  await Project.deleteOne({ _id: id })
  return ok(res, 'Project deleted.', { id })
}

export { listProjects, createProject, updateProject, deleteProject }
