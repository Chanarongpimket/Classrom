const customer = require('../models/customer.js')
const path = require('path')
const myusername = 'admin'
const mypassword = '12345'

exports.home = (req, res) => {
    session = req.session;
    if(session.userid){
        res.render("home");
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");

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