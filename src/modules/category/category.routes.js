const { Router } = require("express")
const categoryController = require("./category.controller.js")
const Authorization = require("../../common/guard/authorization.guard.js")

const router = Router()

router.get("/", categoryController.find)
router.post("/", categoryController.create)

module.exports = {
    CategoryRouter: router
}