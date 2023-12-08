const autoBind = require("auto-bind")
const { StatusCodes: HttpStatus } = require("http-status-codes")
const optionService = require("./option.service.js")
const OptionMessagess = require("./option.messages.js")



class OptionController {
    #service
    constructor() {
        autoBind(this)
        this.#service = optionService
    }
    async create(req, res, next) {
        try {
            const { title, key, category, guide, type, enum: list } = req.body
            await this.#service.create({ title, key, category, guide, type, enum: list })
            return res
                .status(HttpStatus.CREATED)
                .json({
                    message: OptionMessagess.OptionCreated
                })
        } catch (error) {
            next(error)
        }
    }
    async find(req, res, next) {
        try {
            const options = await this.#service.find()
            return res
                .status(HttpStatus.OK)
                .json({
                    options
                })
        } catch (error) {
            next(error)
        }
    }
    async findByCategoryId(req, res, next) {
        try {
            const { categoryId } = req.params
            const options = await this.#service.findByCategoryId(categoryId)
            return res
                .status(HttpStatus.OK)
                .json({
                    options
                })
        } catch (error) {
            next(error)
        }
    }
    async findById(req, res, next) {
        try {
            const { id } = req.params
            const option = await this.#service.findById(id)
            return res
                .status(HttpStatus.OK)
                .json({
                    option
                })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new OptionController()