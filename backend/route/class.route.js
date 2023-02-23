module.exports = (app) => {
    const  classroom = require("../controller/class.controller.js")

    app.post('/classrooms', classroom.create);
    app.post('/classrooms/join', classroom.join);
    

    app.get('/J', classroom.gotoJ);
    app.get('/C', classroom.gotoC);
}