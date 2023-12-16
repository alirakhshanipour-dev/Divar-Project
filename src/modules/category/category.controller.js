const autoBind = require("auto-bind")
const { StatusCodes: HttpStatus } = require("http-status-codes")
const { CategoryMessages } = require("./category.messages.js")
const categoryService = require("./category.service.js")



class CategoryController {
    #service
    constructor() {
        autoBind(this)
        this.#service = categoryService
    }
    async create(req, res, next) {
        try {

            const { name, icon, slug, parent } = req.body
            await this.#service.create({ name, icon, slug, parent })
            return res.status(HttpStatus.CREATED).json({
                message: CategoryMessages.Created
            })
        } catch (error) {
            next(error)
        }
    }
    async find(req, res, next) {
        try {
            const categories = await this.#service.find()
            return res
                .status(HttpStatus.OK)
                .json({
                    categories
                })
        } catch (error) {
            next(error)
        }
    }
    async delete(req, res, next) {
        try {
            const { id } = req.params
            await this.#service.delete(id)
            return res.status(HttpStatus.NO_CONTENT).json({
                message: CategoryMessages.DELETED
            })
        } catch (error) {
            next(error)
        }
    }

}

module.exports = new CategoryController()