import sql from 'mssql';

export const getCourses = async () => {
    const result = await sql.query`SELECT * FROM Courses`;
    return result.recordset;
};
