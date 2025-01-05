// enrollmentController.js

import { enrollUserInCourse } from '../models/enrollmentModel.js';
import { getEnrolledCoursesByUser } from '../models/enrollmentModel.js';

// Enroll user in a course
export const enrollCourse = async (req, res) => {
  const { userId, courseId } = req.body;

  if (!userId || !courseId) {
    return res.status(400).json({ message: 'User ID and Course ID are required' });
  }

  try {
    await enrollUserInCourse(userId, courseId);
    res.status(201).json({ message: 'User enrolled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get enrolled courses for a user
export const getUserEnrolledCourses = async (req, res) => {
  const { userId } = req.params;

  try {
    const courses = await getEnrolledCoursesByUser(userId);
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving courses', error });
  }
};