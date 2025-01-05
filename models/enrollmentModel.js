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

export const getEnrolledCoursesByUser = async (userId) => {
    const request = new sql.Request();
    const result = await request
      .input('UserId', sql.Int, userId)
      .query('SELECT * FROM Courses JOIN Enrollments ON Courses.Id = Enrollments.CourseId WHERE Enrollments.UserId = @UserId');
      
    return result.recordset;
  };