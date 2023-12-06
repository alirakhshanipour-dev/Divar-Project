const { Schema, Types, model } = require("mongoose")

const CategorySchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    icon: { type: String, required: true },
    parent: { type: Types.ObjectId, ref: "Category", required: true },
    parents: { type: [Types.ObjectId], ref: "Category", default: [], required: true },

}, {
    toJSON: { virtuals: true },
    versionKey: false,
    id: false
})

CategorySchema.virtual("children", {
    ref: "Category",
    localField: "_id",
    foreignField: "parent"
})

const CategoryModel = model("category", CategorySchema, "categories")

module.exports = CategoryModel