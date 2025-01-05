// enrollmentModel.js

import sql from 'mssql';

export const enrollUserInCourse = async (id, courseId) => {
  const request = new sql.Request();

  const result = await request
    .input('id', sql.Int, id)
    .input('CourseId', sql.Int, courseId)
    .query(
      'SELECT COUNT(*) AS count FROM Enrollments WHERE UserId = @id AND CourseId = @CourseId'
    );

    console.log(result.recordset[0].count);

  if (result.recordset[0].count> 0) {
    return { alreadyEnrolled: true, success: false };
  } else {
    await request
    .query(
      'INSERT INTO Enrollments (UserId, CourseId) VALUES (@id, @CourseId)'
    );
    return { alreadyEnrolled: false, success: true };

  }


  
};