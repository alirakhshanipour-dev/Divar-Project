const { Router } = require("express");
const userController = require("./user.controller.js");
const Authorization = require("../../common/guard/authorization.guard.js");

const router = Router()

router.get("/whoami", Authorization, userController.whoami)

module.exports = {
    UserRouter: router
}