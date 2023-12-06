// Importing required modules and packages
const autoBind = require("auto-bind");
const { UserModel } = require("../user/user.model.js");
const createHttpError = require("http-errors");
const { AuthMessages } = require("./auth.messages.js");
const { randomInt } = require("crypto")
const jwt = require("jsonwebtoken")
const { config } = require("dotenv"); config()

// Defining the AuthService class
class AuthService {
    #model;
    constructor() {
        autoBind(this);
        this.#model = UserModel;
    }

    async sendOtp(phone) {
        const user = await this.#model.findOne({ phone });
        const now = new Date().getTime();
        const otp = {
            code: randomInt(10000, 99999),
            expiresIn: now + (1000 * 60 * 2)
        };
        if (!user) {
            const newUser = await this.#model.create({ phone, otp });
            return newUser;
        }
        if (user.otp && user.otp.expiresIn > now) throw new createHttpError.BadRequest(AuthMessages.OtpCodeNotExpired);
        user.otp = otp;
        await user.save();
        return user;
    }

    async checkOtp(phone, code) {
        const user = await this.checkUserExists(phone)
        const now = new Date().getTime()
        if (now > user?.otp?.expiresIn) throw new createHttpError.Unauthorized(AuthMessages.OtpCodeExpired)
        if (code !== user.otp.code) throw new createHttpError.Unauthorized(AuthMessages.OtpCodeNotMatch)
        if (!user.verified_Phone) user.verified_Phone = true
        const accessToken = await this.signToken({ phone, userId: user._id })
        user.access_token = accessToken
        await user.save()
        return accessToken
    }



    async checkUserExists(phone) {
        const user = await this.#model.findOne({ phone });
        if (!user) throw new createHttpError.NotFound(AuthMessages.NotFoundUser);
        return user;
    }

    async signToken(payload = {}) {
        return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1y" })
    }
}

// Exporting an instance of the AuthService class to be used as a singleton
module.exports = new AuthService();
