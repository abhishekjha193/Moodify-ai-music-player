const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");

async function registeruser(req, res) {
  const { username, email, password } = req.body;

  const isalreadyregistered = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isalreadyregistered) {
    return res
      .status(400)
      .json({ message: "user with the same email or username already exists" });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({ username, email, password: hash });

  const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET, {
    expiresIn: "30h",
  });

  res.cookie("token", token);

  return res.status(201).json({
    message: "user registered sucessfully",
    user: {
      id: user._id,
      username: user._id,
      email: user.email,
    },
  });
}

async function loginuser(req, res) {
  const { email, password, username } = req.body;

  const user = await userModel.findOne({
    $or: [{ email }, { username }],
  }).select("+password")

  if (!user) {
    return res.status(400).json({
      message: "Invalid Credentails",
    });
  }

  const isPasswordvalid = await bcrypt.compare(password, user.password);

  if (!isPasswordvalid) {
    return res.status(400).json({
      message: "invalid credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    },
  );

  res.cookie("token", token);

  return res.status(201).json({
    message: "user logged in successfully",
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
    message : "user fetched successfully",
    user
  })
}

async function logoutuser(req, res) {
    const token = req.cookies.token

    res.clearCookie("token")
    
    await blacklistModel.create({
     token
    })

    res.status(200).json({
        message:"logout sucessfully"
    })
}

module.exports = { registeruser, loginuser, getme , logoutuser }

