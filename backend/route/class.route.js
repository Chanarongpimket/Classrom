module.exports = (app) => {
    const  classroom = require("../controller/class.controller.js")

    app.post('/classroomscreate', classroom.create);
    app.post('/classrooms/join', classroom.join);
    

    app.get('/joinpage', classroom.gotoJ);
    app.get('/createpage', classroom.gotoC);
    app.get('/work', classroom.gotowork);
    app.get('/calendar', classroom.gotocalendar);
    
}