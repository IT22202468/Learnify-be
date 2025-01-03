const sql = require('mssql/msnodesqlv8');

const sqlConfig = {
  user: process.env.DB_USER || 'learnify',
  password: process.env.DB_PASS || 'password123!@',
  database: process.env.DB_NAME || 'UserManagement',
  server: process.env.DB_HOST || 'localhost',
  driver: 'msnodesqlv8',
  options: {
    encrypt: true, // Use true if you're on Azure
    trustedConnection: true, // Use for local SQL Server
    trustServerCertificate: true,
  },
};

const connectDB = async () => {
  try {
    await sql.connect(sqlConfig);
    console.log('Connected to SQL Server');
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
};

module.exports = connectDB;
