module.exports = (app) => {
    const account = require("../controller/account.controller.js")

    app.get('/', account.home)
    app.post('/login', account.read)
    app.post('/create', account.create)

    app.get('/signup', account.signup)
    app.get('/login', account.login)
    
}
