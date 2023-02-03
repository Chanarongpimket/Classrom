module.exports = (app) => {
    const account = require("../controller/account.controller.js")

    app.get('/', account.home);
    app.post('/user', account.user);
    app.post('/signup', account.signup);
    app.get('/signin', account.signin);
    app.get('/login', account.login);
    
}
