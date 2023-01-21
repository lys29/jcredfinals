import mysql from "mysql2/promise";

export default async function handler(req, res) {
    const dbconnection = await mysql.createConnection({
        host: "containers-us-west-160.railway.app",
        database: "railway",
        user: "root",
        password: "8FN4s0rhbUSCsP4rT6YH",  
    });
    try {
        const query ="SELECT * FROM motion_table";
        const values = [];
        const [data] = await dbconnection.execute(query, values);
        dbconnection.end();
        
        res.status(200).json({  accounts: data });    
    } catch (error) {
        res. status(500).json({ error: error.message });
    }
}