const { StatusCodes: status } = require("http-status-codes")
const ExceptionMessages = require("./exception.messages.js")
const notFoundHnadler = (app) => {
    app.use((req, res, next) => {
        res.status(status.NOT_FOUND).json({
            message: ExceptionMessages.NotFoundRoute
        })
    })
}

module.exports = notFoundHnadler