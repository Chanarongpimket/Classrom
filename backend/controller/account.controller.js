const collection = require('../models/account');
const Classroom = require('../models/class');
const oneDay = 1000 * 60 * 60 * 24;
const express = require('express');
const sessions = require('express-session');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.use(sessions({
    secret: "thisismysecretkey",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
var session;

exports.home = (req, res) => {
    session = req.session;
    if(session.userid){
        Classroom.find((err,docs) => {
            if(!err){
                res.render("home", {data: docs});
            }
            else{
                res.render("index");
            }
        });
    }else
        res.render('index');
    
};


exports.read = async (req, res) => {
    try{
        const check = await collection.findOne({username:req.body.username})

        if (check.password===req.body.password){
            session = req.session;
            session.userid = req.body.username;
            console.log(req.session)
            Classroom.find((err,docs) => {
                if(!err){
                    res.render("home", {data: docs});
                }
                else{
                    res.render("index");
                }
            });
        }
        else {
            res.send('wrong password')
        }
    }
    catch {
        res.send('wrong details')
    }
};


exports.create = async (req, res) => {
    const data={
        email:req.body.email,
        username:req.body.username,
        password:req.body.password
    }

    try {
        await collection.insertMany([data]);
        res.render('login')
    } catch (error) {
        res.send('Register please')
    }
};

  

exports.signup = (req, res) => {
    res.render("signup")
};
exports.login = (req, res) => {
    res.render('login')
};
exports.logout =(req,res) => {
    req.session.destroy();
    res.redirect('/');
    
}