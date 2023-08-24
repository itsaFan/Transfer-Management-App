const jwt = require("jsonwebtoken");
const config = require("../config/config");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!config.tokenSecret) {
    return res.status(500).json({ error: "Token secret is missing or undefined" });
  }

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, config.tokenSecret, (error, userInfo) => {
      if (error) {
        console.log("JWT verification error:", error);
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
      }
      req.userInfo = userInfo;
      next();
    });
  } else {
    res.status(401).json({ error: "Unauthorized: No bearer token" });
  }
};

module.exports = { verifyJWT };
