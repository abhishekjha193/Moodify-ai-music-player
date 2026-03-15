const blacklistModel = require("../models/blacklist.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const redis = require("../config/cache");

async function authuser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "token not provided",
    });
  }

  const istokenblacklisted = await redis.get(token)

  if (istokenblacklisted) {
    return res.status(401).json({
      message: " invalid token ",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
}

module.exports = authuser;
