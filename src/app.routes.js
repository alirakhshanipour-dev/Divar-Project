const { Router } = require("express")
const { AuthRouter } = require("./modules/auth/auth.routes.js")
const { UserRouter } = require("./modules/user/user.routes.js")
const { CategoryRouter } = require("./modules/category/category.routes.js")

const mainRouter = Router()
mainRouter.use("/auth", AuthRouter)
mainRouter.use("/user", UserRouter)
mainRouter.use("/category", CategoryRouter)

module.exports = mainRouter