const classroom = require('../models/class');

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



function generateClassCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';

  for (let i = 0; i < 5; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return code;
}

// exports.create = async (req, res, next) => {
//   const name = req.body.classname;
//   const check = await Classroom.findOne({ classname: name });
//   const classCode = generateClassCode();
//   const user = req.session.userid;
//         // check classroom name that user will use is already registered
//         if (check) {
//             console.log("classroom already exists!!!"); 
//             res.send('Hello');
//             return;
//         }
//         //check that input no empty
//         if ( req.body.classname != "" && req.body.description != "" ) {
//             const data = {
//                 classId: classCode,
//                 classname: name,
//                 teacher: user,
//                 description: req.body.description
//             };

//             await Classroom.insertMany([data]);
//             res.render('home');
//         } else {
//             console.log(classCode);
//         }
//     };

exports.create = async (req, res) => {
  const classCode = generateClassCode();
  const data={
      classId:classCode,
      classname:req.body.classname,
      teacher:req.session.userid,
      description: req.body.description
  };

  try {
      await classroom.insertMany([data]);
      res.redirect('/')
  } catch (error) {
      res.send(error)
  }
};


exports.join = async (req, res, next) => {
      const classID = req.body.classId;
      const user = req.session.userid;

      try {
        // Find the classroom with the given ID
        const classroom = await Classroom.findOne({ classId: req.body.classId });

        if (classroom) {
          // Update the classroom's member list with the user's email
          await Classroom.updateOne({ classId: classID }, { $addToSet: { student: user} });
          res.send('<script>alert("Join Complete!!!"); window.location.href="/view/Home/Home.html";</script>');
        } else {
          res.send('<script>alert("Class Not Found!!!"); window.location.href="/view/Join Classroom/Jc.html";</script>');
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
      }
  };

exports.gotoJ = (req, res) => {
  res.render("joinClass")
};
exports.gotoC = (req, res) => {
  res.render('createClass')
};
exports.gotowork = (req, res) => {
  res.render('work')
};
exports.gotocalendar = (req, res) => {
  res.render('calendar')
};