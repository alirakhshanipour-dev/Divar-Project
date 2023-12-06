// Importing required modules and packages
const autoBind = require("auto-bind");
const createHttpError = require("http-errors");
const { config } = require("dotenv");
const UserModel = require("./user.model.js");
const { StatusCodes: HttpStatus } = require("http-status-codes")
const AuthorizationMessages = require("../../common/messages/auth.message.js");
config();

// Defining the AuthService class
class UserService {
    #model;
    constructor() {
        autoBind(this);
        this.#model = UserModel;
    }
    // async getProfile() {
    //     const user = req.user
    //     if (!user) throw new createHttpError.Unauthorized(AuthorizationMessages.UnAuthorized)
    //     return user

}



// Exporting an instance of the AuthService class to be used as a singleton
module.exports = new UserService();
