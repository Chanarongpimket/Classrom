const customer = require('../models/customer.js')
const path = require('path')

exports.home = (req, res) => {
    session = req.session;
    if(session.userid){
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }else
        res.render('login')
}

