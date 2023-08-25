const express = require("express");
const config = require("./src/config/config");
const dbConnection = require("./src/db/db-connection");
const authRoutes = require('./src/routes/authRoutes');
const transferRoutes = require('./src/routes/transferRoutes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
app.use(express.json());

dbConnection();


app.use('/api', authRoutes)
app.use('/api/transfer', transferRoutes)

//Server documentation 
const swaggerDocument = YAML.load("./src/doc/openapi.yaml");
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(config.port, () => 
    console.log(`Server is running on port ${config.port}`)
);
