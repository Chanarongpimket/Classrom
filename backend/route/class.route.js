module.exports = (app) => {
    const  classroom = require("../controller/class.controller.js")

    app.post('/classroomscreate', classroom.create);
    app.post('/classrooms/join', classroom.join);
    

    app.get('/J', classroom.gotoJ);
    app.get('/C', classroom.gotoC);
    app.get('/work', classroom.gotowork);
    
}