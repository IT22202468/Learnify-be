import express from 'express';
import { enrollCourse, getUserEnrolledCourses } from '../controllers/enrollmentController.js';

const router = express.Router();

router.post('/enrollments', enrollCourse);
router.get('/enrollments/:userId', getUserEnrolledCourses);

export default router;
