const autoBind = require("auto-bind")
const authService = require("./auth.service.js")
const { AuthMessages } = require("./auth.messages.js")
const NodeEnv = require("../../constants/env.enum.js")
const { StatusCodes: HttpStatus } = require("http-status-codes")
const Cookies = require("../../constants/cookie.enum.js")
const AuthorizationMessages = require("../../common/messages/auth.message.js")

class AuthController {
    #service
    constructor() {
        autoBind(this)
        this.#service = authService
    }
    async sendOtp(req, res, next) {
        try {
            const { phone } = req.body
            const result = await this.#service.sendOtp(phone)
            return res.json({
                message: AuthMessages.SendOtpSuccessfully,
                data:
                {
                    phone: result.phone,
                    otp_code: result.otp.code
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async checkOtp(req, res, next) {
        try {
            const { phone, code } = req.body
            const token = await this.#service.checkOtp(phone, code)
            res
                .cookie(Cookies.AccessToken, token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === NodeEnv.Development
                })
                .status(HttpStatus.OK)
                .json({
                    message: AuthMessages.CheckOtpSuccess,
                })
        } catch (error) {
            next(error)
        }
    }
    async logout(req, res, next) {
        try {
            return res.clearCookie(Cookies.AccessToken).status(HttpStatus.OK).json({
                message: AuthorizationMessages.LogoutSuccess
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AuthController()