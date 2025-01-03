const sql = require('mssql');

const createUser = async (fullname, email, password) => {
  const request = new sql.Request();
  await request
    .input('Fullname', sql.NVarChar, fullname)
    .input('Email', sql.NVarChar, email)
    .input('Password', sql.NVarChar, password)
    .query(
      'INSERT INTO Users (Fullname, Email, Password) VALUES (@Fullname, @Email, @Password)'
    );
};

module.exports = { createUser };
