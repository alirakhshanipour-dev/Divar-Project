const express = require("express");
const dotenv = require("dotenv");
const SwaggerConfig = require("./src/config/swagger.config");
const mainRouter = require("./src/app.routes");

const notFoundHandler = require("./src/common/exception/notFoundHandler.js");
const allExceptionHandler = require("./src/common/exception/all-exception.js");
const cookieParser = require("cookie-parser");

dotenv.config();

async function main() {
    const app = express();
    const port = process.env.PORT;

    require("./src/config/mongoose.config");

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));
    app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
    app.use(mainRouter);

    SwaggerConfig(app);

    notFoundHandler(app);
    allExceptionHandler(app);

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

main();
