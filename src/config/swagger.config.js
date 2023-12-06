const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

function SwaggerConfig(app) {
    const swaggerDocument = swaggerJsDoc({
        swaggerDefinition: {
            openapi: "3.0.1",
            info: {
                title: "divar-backend",
                description: "botostart nodejs course",
                version: "1.0.0",
            },
        },
        apis: [process.cwd() + "/src/modules/**/*.swagger.js"],
    });

    // Specify a dedicated route for Swagger UI
    app.use("/api-docs", swaggerUi.serve);
    app.get("/api-docs", swaggerUi.setup(swaggerDocument));

    // Optional: Add a redirect from the root URL to Swagger UI
    app.get("/", (req, res) => {
        res.redirect("/api-docs");
    });
}

module.exports = SwaggerConfig;
