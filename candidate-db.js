const sql = require('mssql/msnodesqlv8');

const sqlConfig = {
    database: 'CandidateTracker',
    server: '.\\sqlexpress',
    driver: 'msnodesqlv8',
    options: {
        trustServerCertificate: true,
        trustedConnection: true
    }
}
    const add = async ({ firstName, lastName, phone, email, notes, registrationStatus}) => {
        await sql.connect(sqlConfig);
        await sql.query`INSERT INTO Candidates (FirstName, LastName, Phone, Email, Notes, RegistrationStatus) 
        VALUES (${firstName}, ${lastName}, ${phone}, ${email}, ${notes}, ${registrationStatus})`;
    }
    const getCandidates = async () => {
        await sql.connect(sqlConfig);
        const { recordset } = await sql.query('SELECT * FROM Candidates');
        return recordset;
    }
    const update = async ({id, registrationStatus}) => {
        await sql.connect(sqlConfig);
        await sql.query`UPDATE Candidates SET RegistrationStatus = ${registrationStatus} WHERE Id = ${id}`;
    }
    const getById = async id => {
        await sql.connect(sqlConfig);
        const { recordset } = await sql.query`SELECT * FROM Candidates WHERE Id = ${id}`;
        return recordset[0];
    }
    const statusCount=async()=>{
        await sql.connect(sqlConfig);
        return{
            Pending:await sql.query`select  count(RegistrationStatus)from Candidates where RegistrationStatus=0`,
            Condfirmed:await sql.query`select  count(RegistrationStatus)from Candidates where RegistrationStatus=1`,
            Refused:await sql.query`select  count(RegistrationStatus)from Candidates where RegistrationStatus=2`
        }
    }
    const getConfirmedCount=async()=>{
        await sql.connect(sqlConfig);
        const { recordset } = await sql.query`select  count(RegistrationStatus)from Candidates where RegistrationStatus=1`
     return recordset;
    }
    const getRefusedCount=async()=>{
        await sql.connect(sqlConfig);
        const { recordset } = await sql.query`select  count(RegistrationStatus)from Candidates where RegistrationStatus=2`
     return recordset;
    }
