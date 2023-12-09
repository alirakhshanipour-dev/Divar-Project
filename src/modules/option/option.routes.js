const { Router } = require("express")
const optionController = require("./option.controller.js")

const router = Router()

router.get("/by-category/:categoryId", optionController.findByCategoryId)
router.get("/:id", optionController.findById)
router.get("/", optionController.find)
router.post("/", optionController.create)
router.delete("/:id", optionController.delete)

module.exports = { OptionRouter: router }