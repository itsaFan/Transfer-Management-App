const express = require("express");
const config = require("./src/config/config");
const dbConnection = require("./src/db/db-connection");
const authRoutes = require('./src/routes/authRoutes')

const app = express();
app.use(express.json());

dbConnection();


app.use('/api', authRoutes)


app.listen(config.port, () => 
    console.log(`Server is running on port ${config.port}`)
);
