const createHttpError = require("http-errors")
const { OptionModel } = require("./option.model.js")
const { CategoryMessages } = require("../category/category.messages.js")
const autoBind = require("auto-bind")
const { default: slugify } = require("slugify")
const CategoryModel = require("../category/category.model.js")
const OptionMessagess = require("./option.messages.js")
const { Types } = require("mongoose")

class OptionService {
    #model
    #CategoryModel
    constructor() {
        autoBind(this)
        this.#model = OptionModel
        this.#CategoryModel = CategoryModel
    }
    async create(optionDto) {
        const category = await this.checkExistsCategoryById(optionDto.category)
        optionDto.key = slugify(optionDto.key, { trim: true, lower: true })
        await this.checkExistsKeyOption(category._id, optionDto.key)
        if (optionDto?.enum && typeof optionDto.enum === "string") {
            optionDto.enum = optionDto.enum.split(",")
        } else if (Array.isArray(optionDto.enum)) optionDto.enum = []
        const option = this.#model.create(optionDto)
        return option
    }
    async find() {
        const options = await this.#model.find({})
            .populate([{ path: "category", select: { name: 1, slug: 1 } }])
        return options
    }
    async findByCategoryId(categoryId) {
        const category = await this.checkExistsCategoryById(categoryId)
        const options = await this.#model.find({ category })
        return options
    }
    async findById(id) {
        const option = await this.#model.findById(id)
        if (!option) throw new createHttpError.NotFound(OptionMessagess.OptionNotFound)
        return option
    }
    async delete(id) {
        const option = await this.#model.deleteOne({ _id: id })
        if (option.deletedCount == 0)
            throw new createHttpError.NotFound(OptionMessagess.OptionNotFound)
    }




    // asistant methods
    async checkExistsKeyOption(category, key) {
        const keyExists = await this.#model.findOne({ category, key })
        if (keyExists) throw new createHttpError.Conflict(OptionMessagess.OptionAlreadyExists)
        return null
    }
    async checkExistsCategoryById(id) {
        const category = await this.#CategoryModel.findById(id)
        if (!category) throw new createHttpError.NotFound(CategoryMessages.NotFound)
        return category
    }

}

module.exports = new OptionService()