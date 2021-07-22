const express = require("express");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { registerValidations, loginValidations } = require("../validation");

//Register a user

router.post("/register", async (req, res) => {
  const { error } = registerValidations(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if the user is already registered

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({ user: savedUser._id });
  } catch (error) {
    res.status(400).send(error);
  }
});

//Login a user

router.post("/login", async (req, res) => {
  //Lets validate the data
  const { error } = loginValidations(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if the user exist

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or Password is wrong");

  //Password is correct or not
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  //create and assign the token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
