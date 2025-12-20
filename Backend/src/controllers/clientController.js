import fs from 'fs/promises'
import path from 'path'

import Client from '../models/Client.js'
import { cropAndResizeImage } from '../utils/imageCropper.js'

function ok(res, message, data, code = 200) {
  return res.status(code).json({ status: 'success', message, data })
}

async function listClients(req, res) {
  const clients = await Client.find().sort({ createdAt: -1 })
  return ok(res, 'Clients fetched.', clients)
}

async function createClient(req, res) {
  const { name, designation, description } = req.body

  if (!req.file) {
    return res.status(400).json({ status: 'fail', message: 'Client image is required.', data: null })
  }

  const inputPath = req.file.path
  const outputDir = path.join(process.cwd(), 'uploads', 'clients')

  const { relativePath } = await cropAndResizeImage({
    inputPath,
    outputDir,
    baseName: name || 'client',
    width: 450,
    height: 350,
  })

  await fs.unlink(inputPath).catch(() => null)

  const client = await Client.create({
    name,
    designation,
    description,
    imagePath: `/${relativePath}`,
  })

  return ok(res, 'Client created.', client, 201)
}

export { listClients, createClient }
