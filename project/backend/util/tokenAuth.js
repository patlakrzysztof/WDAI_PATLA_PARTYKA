require("dotenv").config();
const jwtKey = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  try {
    const token = req.cookies?.token || req.headers["authorization"];
    if (!token)
      return res.status(401).json({ error: "no authorization" });

    const decoded = jwt.verify(token, jwtKey);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ error: "invalid token" });
  }
}

module.exports = authenticateToken;
