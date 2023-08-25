const express = require("express");
const config = require("./src/config/config");
const dbConnection = require("./src/db/db-connection");
const authRoutes = require("./src/routes/authRoutes");
const transferRoutes = require("./src/routes/transferRoutes");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const OpenApiValidator = require("express-openapi-validator");
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

//establish db connection
dbConnection();

//Server documentation
const swaggerDocument = YAML.load("./src/doc/openapi.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use((req, res, next) => {
  console.log("Open Api Validation Working.");
  next();
});

//OpenApi-Validation Middleware
app.use(
  OpenApiValidator.middleware({
    apiSpec: "./src/doc/openapi.yaml",
    validateRequests: true,
    //   validateResponses: true,
  })
);

//app routes
app.use("/api", authRoutes);
app.use("/api/transfer", transferRoutes);

//Open-api error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

app.listen(config.port, () => 
    console.log(`Server is running on port ${config.port}`)
);
