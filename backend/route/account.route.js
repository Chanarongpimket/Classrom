module.exports = (app) => {
    const account = require("../controller/account.controller.js")

    app.get('/', account.home);
    app.post('/user', account.user);

}
