import express from 'express'
import path from 'path'

import asyncHandler from '../middleware/asyncHandler.js'
import { createUploader } from '../middleware/upload.js'
import { requireAuth } from '../middleware/auth.js'
import {
	listProjects,
	createProject,
	updateProject,
	deleteProject,
} from '../controllers/projectController.js'

const router = express.Router()
const upload = createUploader(path.join(process.cwd(), 'uploads', 'projects'))

router.get('/', asyncHandler(listProjects))
router.post('/', requireAuth, upload.single('image'), asyncHandler(createProject))
router.patch('/:id', requireAuth, upload.single('image'), asyncHandler(updateProject))
router.delete('/:id', requireAuth, asyncHandler(deleteProject))

export default router
