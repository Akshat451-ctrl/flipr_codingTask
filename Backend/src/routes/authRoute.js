import express from 'express'

import asyncHandler from '../middleware/asyncHandler.js'
import { requireAuth } from '../middleware/auth.js'
import { signup, login, me, logout } from '../controllers/authController.js'

const router = express.Router()

router.post('/signup', asyncHandler(signup))
router.post('/login', asyncHandler(login))
router.get('/me', requireAuth, asyncHandler(me))
router.post('/logout', requireAuth, asyncHandler(logout))

export default router
