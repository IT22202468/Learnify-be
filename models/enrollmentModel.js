// enrollmentModel.js

import sql from 'mssql';

export const enrollUserInCourse = async (userId, courseId) => {
  const request = new sql.Request();
  await request
    .input('UserId', sql.Int, userId)
    .input('CourseId', sql.Int, courseId)
    .query(
      'INSERT INTO Enrollments (UserId, CourseId) VALUES (@UserId, @CourseId)'
    );
};