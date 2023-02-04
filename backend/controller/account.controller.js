const path = require('path');
const collection = require('../models/account');
var session;

exports.home = (req, res) => {
    session = req.session;
    if(session.userid){
        res.render("home")

    }else
        res.render('login')
};

exports.read = async (req, res) => {
    
    try{
        const check = await collection.findOne({username:req.body.username})

        if (check.password===req.body.password){
            res.render('home')
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