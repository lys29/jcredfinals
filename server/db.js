const mysql = require('mysql2');

const db = mysql.createPool({
    connectionLimit: 10,
    host: "containers-us-west-160.railway.app",
    user: "root",
    password: "8FN4s0rhbUSCsP4rT6YH",
    database: "railway"
})

module.exports = db;