const { Types, Schema } = require("mongoose");

const PostSchema = new Schema({
    category: { type: Types.ObjectId, ref: "category", required: true },
    province: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    cordinate: { type: [Number], }
})