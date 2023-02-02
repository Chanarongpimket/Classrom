module.exports = (app) => {
    const account = require("../controller/account.controller.js")

    app.get('/', account.home);
}
