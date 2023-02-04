const path = require('path');
const collection = require('../models/account');
var session;

const myusername = 'admin'
const mypassword = '12345'

exports.home = (req, res) => {
    session = req.session;
    if(session.userid){
        res.render("home")

    }else
        res.render('login')
};

exports.user = (req, res) => {
    if(req.body.username == myusername && req.body.password == mypassword){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        res.render('home')
    }
    else{
        res.send('Invalid username or password')
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
        res.render('home')
    } catch (error) {
        res.status(500).send(error);
    }
};

  

exports.signup = (req, res) => {
    res.render("signup")
};
exports.login = (req, res) => {
    res.render('login')
};