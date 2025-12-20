import express from 'express'

import asyncHandler from '../middleware/asyncHandler.js'
import { addSubscriber, listSubscribers } from '../controllers/subscriberController.js'
import { requireAuth } from '../middleware/auth.js'

const router = express.Router()

router.get('/', requireAuth, asyncHandler(listSubscribers))
router.post('/', asyncHandler(addSubscriber))

export default router
