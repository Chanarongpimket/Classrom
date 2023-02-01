// Import library
const express = require('express');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');

// Initial express app
const app = express();
const PORT = 3000;

// Add the Express-session option
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecretkey",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

// Parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serving public file
app.use(express.static(__dirname));

// Cookie parser middleware
app.use(cookieParser());

// Setup authentication credential
const myusername = 'admin'
const mypassword = '12345'

// a variable to save session
var session;



// page => welcome
app.get('/',(req,res) => {
    var session = req.session;
    if(session.userid){
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }else
    res.sendFile('views/index.html',{root:__dirname})
});

// page => User 
app.post('/user',(req,res) => {
    if(req.body.username == myusername && req.body.password == mypassword){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        res.send(`Hello, welcome <a href=\'/logout'>click to logout</a>");`)
    }
    else{
        res.send('Invalid username or password')
    }
});

// page => logout
app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

// page => Error
app.get('*', (req,res) => {
    res.send('ไม่พบหน้าที่คุณร้องขอ (Error: 404 Page not Found)')
});

app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));