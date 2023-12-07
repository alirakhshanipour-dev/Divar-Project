const { Types, Schema, model } = require("mongoose");

const OptionSchema = new Schema({
    title: { type: String, required: true },
    key: { type: String, required: true },
    type: { type: String, enum: ["number", "string", "array", "boolean"] },
    enum: {
        type: Array, default: []
    },
    guide: { type: String, required: false },
    category: { type: Types.ObjectId, ref: "category", required: true }
})

const OptionModel = model("option", OptionSchema, "options")

module.exports = OptionModel