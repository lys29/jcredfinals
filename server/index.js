const express = require("express");
const boddParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const db = require('./db');
const app = express();

app.use(boddParser.json());
app.use(boddParser.urlencoded({ extended: true}));
app.use(expressSession({ secret: 'mySecretKey', resave: false, saveUninitialized: false}));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(cookieParser('mySecretKey'));

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.get('/', (req, res) => {
    res.send("SERVER RUNNING!");
});

//SIGN UP 
app.post('/register', (req, res) => {
    const FullName = req.body.FullName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;

    const query = "INSERT INTO user_table (`FullName`, `email`, `password`,`confirmpassword`) VALUES (?, ?, ?, ?)";
    const query2 = "SELECT * FROM user_table WHERE email = ?";
    
    db.query(query2, [email], (err, result) => {
        if(err) {throw err;}
        if(result.length > 0) {
            res.send({message: "Email Already Taken"});
        }

        if(result.length === 0){
            const hashedPassword = bcrypt.hashSync(password, 10)
            const hashedConfirmPassword = bcrypt.hashSync(confirmpassword, 10)
            db.query(query, [FullName, email, hashedPassword, hashedConfirmPassword], (err, result) => {
                if(err) {throw err;}
                res.send({message: "User Created!"});
            })
        }
    });
});

//LOG IN
app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) {throw err;}
        if(!user) {
            res.send({message: "No User Exist"});
            }

        if(user) {
            req.login(user, (err) => {
                if(err) {throw err;}
                res.send({message: "User Logged in"});
                console.log(user);
             
            })
        }
    })(req, res, next);
});

//CAHNGE PASSWORD
app.post('/change_password', (req, res) => {
    const FukkName= req.body.FullName;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;

    const query = `UPDATE user_table SET password = ?, confirmpassword = ? WHERE email = ?`;
    //const query = "INSERT INTO user_accounts (`username`, `password`) VALUES (?, ?)";
    //const query2 = "SELECT * FROM user_accounts WHERE username = ?";

    const hashedPassword = bcrypt.hashSync(password, 10);
    const hashedConfirmPassword = bcrypt.hashSync(confirmpassword, 10);
    db.query(query, [hashedPassword, hashedConfirmPassword, email], (err, result) => {
        if(err) {throw err;}
        res.send({message: "Account password updated!"});
    })

});

app.get('/getUser', (req, res) => {
    res.send.apply(req.user);
});


// //DISPLAY CAMERA
// app.get("/displaycam", (req, res) => {
//     connection.query(
//         "SELECT * FROM `camera_table`",
//         function (err, results) {
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
//                     console.log(results);
//                 }
//             }
//             catch (err) {
//                 res.json({ message: err });
//             }

//         })
// });

app.listen(3001, () => {
    console.log("Server Started on port 3001")
});