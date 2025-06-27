const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = (req, res) => {
  res.send("Login");
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    let User = await user.save();
    res.status(201).send("User Created Successfully", User);
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  login,
  register,
};
