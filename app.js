const express = require("express");
const config = require("./src/config/config");
const dbConnection = require("./src/db/db-connection");

const app = express();
app.use(express.json());

dbConnection();



app.listen(config.port, () => 
    console.log(`Server is running on port ${config.port}`)
);
