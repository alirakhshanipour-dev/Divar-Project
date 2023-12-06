const { default: mongoose } = require("mongoose")
const { config } = require("dotenv")
config()

mongoose.connect(process.env.DB_URL, { dbName: process.env.DB_NAME }).then(() => {
    console.log("Connected To MongoDB On Port 27017");
}).catch(err => {
    console.log(err.message ?? "Failed To Connect To MongoDB");
})