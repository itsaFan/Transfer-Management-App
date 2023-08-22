require("dotenv").config();

const config = {
  port: process.env.PORT,
  mongoUri: process.env.MONGODB_URI,
};

module.exports = config;
