const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const mysql = require('mysql2');

app.use(cors());
app.use(bodyparser.json());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database : 'userinfo'
})

db.connect(err => {
    if(err){
        console.log(err)
    }
    console.log("Database connected successfully")
})

// get all users data
app.get('/users', (req, res) => {
    let qrr = `select * from users`
    db.query(qrr,(err, result) => {
        if(err){
            console.log(err, 'error');
        }
        if(result.length > 0){
            res.send({
                data:result
            })
        }
    })
})


// get single user data using ID
app.get('/users/:id', (req, res)=>{
    let qrId = req.params.id;
    let qrr = `select * from users where id = ${qrId}`;
    db.query(qrr, (err, result)=>{
        if(err){
            console.log(err, 'error');
        }
        if(result.length > 0){
            res.send({
                data: result
            })
        } else {
            res.send({
                message:"Data not found"
            });
        }
    })
})

// Post data
app.post('/users', (req, res) => {
    let fullname = req.body.fullname;
    let email = req.body.email;
    let mobile = req.body.mobile;

    let qrr = `insert into users (fullname, email, mobile) values ('${fullname}', '${email}', '${mobile}')`

    db.query(qrr, (err,result)=>{
        if(err){
            console.log(err);
        }
        // if(result.affectedRows > 0){
            res.send({
                message: 'Data sent successfully',
                data: result
            });
        // }
    })
})

// Update data
app.put('/user/:id', (req, res) => {
    let uid = req.params.id
    let fullname = req.body.fullname;
    let email = req.body.email;
    let mobile = req.body.mobile;

    let qrr = `update users set fullname='${fullname}', email='${email}', mobile='${mobile}' where id = ${uid}`;
   
    db.query(qrr, (err,result)=>{
        if(err){
            console.log(err);
        }
        // if(result.affectedRows > 0){
            res.send({
                message: 'Data updated successfully',
                data: result
            });
        // }
    })
});

app.delete('/user/:id', (req, res) => {
    let uid = req.params.id;

    let qrr = `delete from users where id = ${uid}`

    db.query(qrr, (err, result) => {
        if(err){
            console.log(err, "Not deleted");
        }
        res.send({
            message: 'User Deleted',
            data: result
        })
    })
})


app.listen(3000, () => {
    console.log(`listening on http://localhost:3000`);
})