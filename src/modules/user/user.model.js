const { Schema, model } = require("mongoose");


const OtpSchema = new Schema({
    code: { type: String, required: false, default: undefined },
    expiresIn: { type: Number, required: false, default: 0 },
})

const UserSchema = new Schema({
    fullName: { type: String, default: "", required: false },
    phone: { type: String, unique: true, required: true },
    otp: { type: OtpSchema },
    verified_Phone: { type: Boolean, default: false, required: true },
    access_token: { type: String, default: "" },
}, {
    timestamps: true
})

const UserModel = model("user", UserSchema, "users")
module.exports = { UserModel } 