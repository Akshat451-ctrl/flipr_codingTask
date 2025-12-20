import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true })
}

function normalizeToForwardSlashes(filePath) {
  return filePath.replace(/\\/g, '/')
}

async function cropAndResizeImage({ inputPath, outputDir, baseName, width = 450, height = 350 }) {
  await ensureDir(outputDir)

  const safeBaseName = baseName.replace(/[^a-zA-Z0-9_-]/g, '_')
  const fileName = `${safeBaseName}-${Date.now()}.jpg`
  const outputPath = path.join(outputDir, fileName)

  await sharp(inputPath)
    .rotate()
    .resize(width, height, { fit: 'cover' })
    .jpeg({ quality: 82 })
    .toFile(outputPath)

  return {
    outputPath,
    fileName,
    relativePath: normalizeToForwardSlashes(path.relative(process.cwd(), outputPath)),
  }
}

export { cropAndResizeImage }
