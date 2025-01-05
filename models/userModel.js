// userModel.js

import sql from 'mssql';

export const createUser = async (fullname, email, hashedPassword) => {
  const request = new sql.Request();
  await request
    .input('Fullname', sql.NVarChar, fullname)
    .input('Email', sql.NVarChar, email)
    .input('Password', sql.VarChar, hashedPassword)
    .query(
      'INSERT INTO Users (Fullname, Email, Password) VALUES (@Fullname, @Email, @Password)'
    );
};

export const getUserByEmail = async (email) => {
  const request = new sql.Request();
  const result = await request
    .input('Email', sql.NVarChar, email)
    .query('SELECT * FROM Users WHERE Email = @Email');

  return result.recordset[0];
};


// Get user profile
export const getUserProfile = async (userId) => {
  const request = new sql.Request();

  // Get user details and enrolled courses
  const result = await request
    .input('UserId', sql.Int, userId)
    .query(`
      SELECT 
        u.Fullname, u.Email, u.CreatedAt,
        c.Name AS CourseName, c.Description, c.Price, c.Duration
      FROM Users u
      LEFT JOIN Enrollments e ON u.Id = e.UserId
      LEFT JOIN Courses c ON e.CourseId = c.Id
      WHERE u.Id = @UserId
    `);

  return result.recordset;
};