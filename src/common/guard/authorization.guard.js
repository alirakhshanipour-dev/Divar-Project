const createHttpError = require("http-errors")
const AuthorizationMessages = require("../messages/auth.message.js")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../../modules/user/user.model.js")
require("dotenv").config()

const Authorization = async (req, res, next) => {
    try {
        const token = req?.cookies?.access_token
        if (!token) throw new createHttpError.Unauthorized(AuthorizationMessages.Login)
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log(data);
        if ("userId" in data && typeof data === "object") {
            const user = await UserModel.
                findOne({ _id: data.userId }, { fullName: 1, phone: 1, createdAt: 1 })
                .lean()
            if (!user) throw new createHttpError.NotFound(AuthorizationMessages.NotFoundUserAccount)
            req.user = user
            return next()
        }
        throw new createHttpError.Unauthorized(AuthorizationMessages.InvalidToken)
    } catch (error) {
        next(error)
    }
}

module.exports = Authorization