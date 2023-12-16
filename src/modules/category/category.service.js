// Importing required modules and packages
const autoBind = require("auto-bind");
const createHttpError = require("http-errors");
const { config } = require("dotenv");
const CategoryModel = require("./category.model.js");
const { isValidObjectId, Types } = require("mongoose");
const { CategoryMessages } = require("./category.messages.js");
const { default: slugify } = require("slugify");
const { default: omitEmpty } = require("omit-empty");
const { OptionModel } = require("../option/option.model.js");


config()

// Defining the CategoryService class
class CategoryService {
    #model;
    #optionModel
    constructor() {
        autoBind(this);
        this.#model = CategoryModel;
        this.#optionModel = OptionModel
    }

    async create(CategoryDTO) {

        if (CategoryDTO?.parent && isValidObjectId(CategoryDTO.parent)) {
            const existCategory = await this.checkCategoryExistsById(
                CategoryDTO.parent
            )
            CategoryDTO.parent = (existCategory)._id
            CategoryDTO.parents = [
                ... new Set([(existCategory)._id.toString()]
                    .concat((existCategory).parents.map(id => id.toString())))
            ].map(id => new Types.ObjectId(id))
        }
        if (CategoryDTO?.slug) {
            CategoryDTO.slug = slugify(CategoryDTO.slug)
            await this.alreadyCategoryExistsBySlug(CategoryDTO.slug)
        }
        else {
            CategoryDTO.slug = slugify(CategoryDTO.name)
        }

        const category = await this.#model.create(CategoryDTO)
        return category
    }
    async find() {
        const categories = await this.#model
            .find({ parent: { $exists: false } })
            .populate([{ path: "children" }])
        return categories
    }
    async delete(id) {
        await this.checkCategoryExistsById(id)
        await this.#optionModel.deleteMany({ category: id }).then(async () => {
            await this.#model.deleteMany({ _id: id })
        })
        return true
    }





    async checkCategoryExistsById(id) {
        const category = await this.#model.findById(id)
        if (!category) {
            throw new createHttpError.NotFound(CategoryMessages.NotFound)
        }
        return category
    }
    async checkCategoryExistsBySlug(slug) {
        const category = await this.#model.findOne({ slug })
        if (!category) {
            throw new createHttpError.NotFound(CategoryMessages.NotFound)
        }
        return category
    }
    async alreadyCategoryExistsBySlug(slug) {
        const category = await this.#model.findOne({ slug })
        if (category) {
            throw new createHttpError.Conflict(CategoryMessages.AlreadyExists)
        }
        return null
    }
}

// Exporting an instance of the Category class to be used as a singleton
module.exports = new CategoryService();
