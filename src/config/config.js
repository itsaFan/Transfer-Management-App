require("dotenv").config();

const config = {
  port: process.env.PORT,
  mongoUri: process.env.MONGODB_URI,
  tokenSecret: process.env.JWT_SECRET,
};

module.exports = config;
