// enrollementsRoutes.js

import express from 'express';
import { enrollCourse } from '../controllers/enrollmentController.js';

const router = express.Router();

router.post('/', enrollCourse);

export default router;
