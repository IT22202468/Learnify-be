// enrollmentController.js

import jwt from "jsonwebtoken";

import { enrollUserInCourse } from "../models/enrollmentModel.js";

// Enroll user in a course
export const enrollCourse = async (req, res) => {
  const { courseId } = req.body;

  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id || !courseId) {
      return res
        .status(400)
        .json({ message: "User ID and Course ID are required" });
    }

    
    const enrollmentResult = await enrollUserInCourse(decoded.id, courseId);

    if (enrollmentResult.alreadyEnrolled) {
      return res.status(204).json({ message: 'You are already enrolled in this course.' });
    }
    
    res.status(201).json({ message: "User enrolled successfully" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(403)
        .json({ message: "Token has expired. Please log in again." });
    }
    if (error.name === "JsonWebTokenError") {
      return res
        .status(403)
        .json({ message: "Invalid token. Please log in again." });
    }
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }

  // if (!userId || !courseId) {
  //   return res.status(400).json({ message: 'User ID and Course ID are required' });
  // }

  // try {
  //   await enrollUserInCourse(userId, courseId);
  //   res.status(201).json({ message: 'User enrolled successfully' });
  // } catch (error) {
  //   res.status(500).json({ message: 'Server error', error });
  // }
};
