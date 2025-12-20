import express from 'express'
import path from 'path'

import asyncHandler from '../middleware/asyncHandler.js'
import { createUploader } from '../middleware/upload.js'
import { listClients, createClient } from '../controllers/clientController.js'
import { requireAuth } from '../middleware/auth.js'

const router = express.Router()
const upload = createUploader(path.join(process.cwd(), 'uploads', 'clients'))

router.get('/', asyncHandler(listClients))
router.post('/', requireAuth, upload.single('image'), asyncHandler(createClient))

export default router
