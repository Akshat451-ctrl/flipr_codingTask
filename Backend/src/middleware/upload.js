import multer from 'multer'
import path from 'path'
import fs from 'fs'

const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp'])

function fileFilter(req, file, callback) {
  if (!allowedMimeTypes.has(file.mimetype)) {
    callback(new Error('Only JPG, PNG, or WEBP images are allowed.'))
    return
  }

  callback(null, true)
}

function createDiskStorage(uploadFolder) {
  return multer.diskStorage({
    destination(req, file, callback) {
      fs.mkdir(uploadFolder, { recursive: true }, (err) => {
        if (err) return callback(err)
        callback(null, uploadFolder)
      })
    },
    filename(req, file, callback) {
      const ext = path.extname(file.originalname).toLowerCase() || '.jpg'
      const base = path
        .basename(file.originalname, ext)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      callback(null, `${base || 'image'}-${Date.now()}${ext}`)
    },
  })
}

function createUploader(uploadFolder) {
  return multer({
    storage: createDiskStorage(uploadFolder),
    fileFilter,
    limits: {
      fileSize: 6 * 1024 * 1024,
    },
  })
}

export { createUploader }
