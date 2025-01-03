import sql from 'mssql';

const sqlConfig = {
  user: 'nipun',
  password: 'nipun',
  database: 'student',
  server: 'localhost\\SQLEXPRESS',
  options: {
    trustedConnection: true, // Use for local SQL Server
    trustServerCertificate: true,
    enableArithAbort: true,
  },
  port: 1433,
};

const connectDB = async () => {
  try {
    await sql.connect(sqlConfig);
    console.log('Connected to SQL Server');
  } catch (err) {
    console.log('Database connection failed:', err.message);
  }
};

export default connectDB;