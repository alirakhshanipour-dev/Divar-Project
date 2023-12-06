const autoBind = require("auto-bind");
const UserModel = require("./user.model.js");
const createHttpError = require("http-errors");
const userService = require("./user.service.js");


class UserController {
    #service
    constructor() {
        autoBind(this)
        this.#service = userService
    }

    async whoami(req, res, next) {
        try {
            const user = req.user
            return res.json(user)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController()