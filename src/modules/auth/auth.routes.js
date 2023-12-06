const { Router } = require("express");
const authController = require("./auth.controller.js");
const Authorization = require("../../common/guard/authorization.guard.js");

const router = Router()

router.post("/send-otp", authController.sendOtp)
router.post("/check-otp", authController.checkOtp)
router.get("/logout", Authorization, authController.logout)

module.exports = {
    AuthRouter: router
}