const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3080;
const hostname = 'localhost';
var bodyParser = require('body-parser');
var dateTime = require('node-datetime');
var dt = dateTime.create();
const cors = require("cors")
app.use(cors())
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
const path = require('path');
const { connect } = require("http2");
const {spawn} = require('child_process');


// MYSQL CONNECTION
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "elai",
    database: "cpet17finals",
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to Database!");
});

// DEFAULT PAGE WITH CREATES
app.get('/', function (req, res) {
    // CREATE DATABASE IF NOT EXISTING YET
    connection.query("CREATE DATABASE IF NOT EXISTS jade_project",
        function (err, results) {
            if (err) throw err;
            console.log(req.query);
            console.log(results);
        });

    var motion_table = ("CREATE TABLE IF NOT EXISTS motion_table (id INT AUTO_INCREMENT PRIMARY KEY,username VARCHAR(45), image LONGBLOB, datetime VARCHAR(100) )")
    var user_table = ("CREATE TABLE IF NOT EXISTS user_table (id INT AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(45), lastname VARCHAR(45), phone VARCHAR(45), username VARCHAR(45), email VARCHAR(45), password VARCHAR(45), confirmpassword VARCHAR(45))")
    
    connection.query(user_table, function (err, result) {
        if (err) throw err;
        console.log(result);
        console.log("User Table created!");
    });

    connection.query(motion_table, function (err, result) {
        if (err) throw err;
        console.log(result);
        console.log("Motion Table created!");
    });

    res.send("DATABASE MADE!")

});

app.get('/on_camera',(req, res) => {
    // res.send('WELCOME!')
    var dataToSend;
    // spawn new child process to call the python script
    const python = spawn('python', ['motion_detector_picture.py']);
    // collect data from script
    python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    res.send("CAMERA OFF")
    });
});


// INSERT WITH PICTURE AND DATETIME
app.post("/motion_detector_picture", (req, res) => {
    const {
        datetime,
        image }
        = req.body;

    connection.query(
        "INSERT INTO motion_table (datetime, image) VALUES (?,?)", [datetime, image],
        function (err, results) {
            console.log(results);
            res.json(results);
        })

});

//DISPLAY IMAGES IN DASHBOARD
app.get("/displaycam", (req, res) => {
    connection.query(
        "SELECT * FROM `motion_table` ORDER BY id DESC",
        function (err, results) {
            if (err) throw err;
            try {
                if (results.length > 0) {
                    res.json({data : results});
                    console.log(results);
                }
            }
            catch (err) {
                res.json({ message: err });
            }

        })
});


// SIGNUP  
// app.post("/signup", (req, res) => {
//     const {
//         firstname,
//         lastname,
//         phone,
//         username,
//         email,
//         password,
//         confirmpassword
//     } = req.body;
//     connection.query(
//         "INSERT INTO user_table (firstname, lastname, phone, username, email, password, confirmpassword) VALUES (?,?,?,?,?,?,?)", [firstname, lastname, phone, username, email, password, confirmpassword]),
//         function (err, results) {
//             if (err) throw err;
//             console.log(req.query);
//             console.log(results);
//             res.send(results);
//             console.log("User added!");
//         }

//     connection.query(
//         "SELECT * FROM `user_table`",
//         function (err, results) {
//             if (err) throw err;
//             console.log(req.query);
//             console.log(results);
//             res.send(results);
//         })

// });

// LOGIN

// RESET PASSWORD

// DISPLAY TABLE IN DASHBOARD

//DISPLAY IMAGES IN DASHBOARD
// app.get("/displaycam", (req, res) => {
//     connection.query(
//         "SELECT * FROM `motion_table`",
//         function (err, results,date_time) {
//             if (err) throw err;
//             try {
//                 if (results.length > 0) {
//                     let base64array = [];
//                     for (let i = 0; i < results.length; i++) {
//                         base64array.push({
//                             data: new Buffer.from(results[i].image).toString("utf8"),
                            
//                         });
//                     }
//                     res.json(base64array);
//                     res.send(date_time);
//                     console.log(results);
//                 }
//             }
//             catch (err) {
//                 res.json({ message: err });
//             }

//         })
// });

// SERVER LISTENER
app.listen(port, hostname, () => {
    console.log('Server Active on http://' + hostname + ":" + port + "/");
});