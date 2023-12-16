const createHttpError = require("http-errors")
const { OptionModel } = require("./option.model.js")
const { CategoryMessages } = require("../category/category.messages.js")
const autoBind = require("auto-bind")
const { default: slugify } = require("slugify")
const CategoryModel = require("../category/category.model.js")
const OptionMessagess = require("./option.messages.js")
const { Types, isValidObjectId } = require("mongoose")
const { isTrue, isFalse } = require("../../common/utils/functions.js")
const categoryService = require("../category/category.service.js")
const omitEmpty = require("omit-empty")


class OptionService {
    #model
    #CategoryModel
    #CategoryService
    constructor() {
        autoBind(this)
        this.#model = OptionModel
        this.#CategoryModel = CategoryModel
        this.#CategoryService = categoryService

    }
    async create(optionDto) {
        const category = await this.checkExistsCategoryById(optionDto.category)
        optionDto.key = slugify(optionDto.key, { trim: true, lower: true })
        await this.checkExistsKeyOption(category._id, optionDto.key)
        if (optionDto?.enum && typeof optionDto.enum === "string") {
            optionDto.enum = optionDto.enum.split(",")
        } else if (!Array.isArray(optionDto.enum)) optionDto.enum = []
        if (isTrue(optionDto?.required)) optionDto.required = true
        if (isFalse(optionDto?.required)) optionDto.required = false
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
    async update(id, optionDto) {
        const option = await this.checkExistsOption(id)
        if (optionDto.category && isValidObjectId(optionDto.category)) {
            const category = await this.#CategoryService
                .checkCategoryExistsById(optionDto.category)
            optionDto.category = (category)._id
        } else {
            delete optionDto.category
        }
        if (optionDto.slug) {
            optionDto.key = slugify(optionDto.key, { trim: true, replacement: "_", lower: true })
            let categoryId = option.category
            if (optionDto.category) categoryId = optionDto.category
            await this.checkExistsKeyOption(categoryId, optionDto.key)
        }
        if (optionDto?.enum && typeof optionDto.enum === "string") {
            optionDto.enum = optionDto.enum.split(",")
        } else if (!Array.isArray(optionDto.enum)) delete optionDto.enum
        if (isTrue(optionDto?.required)) optionDto.required = true
        else if (isFalse(optionDto?.required)) optionDto.required = false
        else delete optionDto?.required
        const data = this.removeEmptyProperties(optionDto)
        return await this.#model.updateOne({ _id: id }, {
            $set: data
        })
    }




    // asistant methods
    removeEmptyProperties(obj) {
        for (const key in obj) {
            if (obj[key] == null || obj[key] === "" || obj[key] === undefined) {
                delete obj[key];
            }
        }
        return obj;
    }
    async checkExistsKeyOption(category, key) {
        const keyExists = await this.#model.findOne({ category, key })
        if (keyExists) throw new createHttpError.Conflict(OptionMessagess.OptionAlreadyExists)
        return null
    }
    async checkExistsOption(id) {
        const optionExists = await this.#model.findById(id)
        if (!optionExists) throw new createHttpError.Conflict(OptionMessagess.OptionNotFound)
        return optionExists
    }
    async checkExistsCategoryById(id) {
        const category = await this.#CategoryModel.findById(id)
        if (!category) throw new createHttpError.NotFound(CategoryMessages.NotFound)
        return category
    }

}

module.exports = new OptionService()