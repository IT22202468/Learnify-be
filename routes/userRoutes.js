// userRoutes.js

import express from 'express';
import { registerUser, loginUser, getProfile, verifyUser  } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);
router.post('/verify', verifyUser);

export default router;