import User from "../models/User.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "jsonsecret", { expiresIn: maxAge });
};

const getSignup = (req, res) => {
  res
    .status(200)
    .render("signup", { title: "Signup - node-jwt-authentication." });
};

const postSignup = async (req, res) => {
  const { email, password } = await req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email." });
  }

  if (!validator.isStrongPassword(password)) {
    return res
      .status(400)
      .json({ error: "Minimum password length is 6 characters." });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ error: "Email already in use." });
  }

  try {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({ email, password: hash });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (error) {
    res.status(400).json(error);
  }
};

const getLogin = (req, res) => {
  res
    .status(200)
    .render("login", { title: "Login - node-jwt-authentication." });
};

const postLogin = async (req, res) => {
  const { email, password } = await req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ error: "Incorrect email address." });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(400).json({ error: "Incorrect password" });
  }

  const token = createToken(user._id);
  res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
  res.status(201).json({ user: user._id });
};

const getLogout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/login");
};

export { getSignup, postSignup, getLogin, postLogin, getLogout };
