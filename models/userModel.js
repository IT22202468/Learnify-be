import sql from 'mssql';
import bcrypt from 'bcrypt';

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
