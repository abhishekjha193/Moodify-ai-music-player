const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");
const redis = require("../config/cache");

async function registeruser(req, res) {

  const { username, email, password } = req.body;


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email format",
    });
  }

  if (!email.endsWith("@gmail.com")) {
    return res.status(400).json({
      message: "Only Gmail allowed",
    });
  }
  const isalreadyregistered = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isalreadyregistered) {
    return res.status(400).json({
      message: "user already exists",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    { id: user._id, username },
    process.env.JWT_SECRET,
    { expiresIn: "30h" }
  );

  res.cookie("token", token);

  return res.status(201).json({
    message: "user registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

async function loginuser(req, res) {
  const { email, password } = req.body;

  const user = await userModel
    .findOne({ email })
    .select("+password");

  if (!user) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }

  const isPasswordvalid = await bcrypt.compare(password, user.password);

  if (!isPasswordvalid) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  res.cookie("token", token);

  return res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

async function getme(req, res) {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    message: "user fetched successfully",
    user,
  });
}

async function logoutuser(req, res) {
  const token = req.cookies.token;

  res.clearCookie("token");

  redis.set(token, Date.now().toString(), "EX", 60 * 60);

  res.status(200).json({
    message: "logout sucessfully",
  });
}

module.exports = { registeruser, loginuser, getme, logoutuser };
