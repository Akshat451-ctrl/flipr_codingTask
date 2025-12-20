import express from 'express'

import asyncHandler from '../middleware/asyncHandler.js'
import { submitContact, listContacts } from '../controllers/contactController.js'
import { requireAuth } from '../middleware/auth.js'

const router = express.Router()

router.get('/', requireAuth, asyncHandler(listContacts))
router.post('/', asyncHandler(submitContact))

export default router
