import { getCourses } from '../models/courseModel.js';

export const getAllCourses = async (req, res) => {
    try {
        const courses = await getCourses();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
