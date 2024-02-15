import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// import crypto from "crypto";
// const secretToken= crypto.randomBytes(32).toString('hex')
// console.log(secretToken)

const secretToken = process.env.SECRET_TOKEN;

const generateToken = (data) => {
  return jwt.sign(data, secretToken, { expiresIn: "1800s" });
};

export const getUser = async (req, res) => {
  const { id } = req.user;
  console.log('from get')
  console.log(req.user)
  try {
    const data = await User.findById(id);
    if (!data) {
      res.sendStatus(404);
    } else {
      res.json(data);
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email, password);
    const user = await User.findOne({email})
    // console.log(user)
    if (!user) {
      return res.status(404).send("From Login: User not found.");
    }
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).send("Invalid credentials");
    }
    const token = generateToken({ email: user.email, admin: user.admin, id: user._id });
    
    res.json({ token, user });
  } catch (error) {
    res.sendStatus(500);
  }
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPW = await bcrypt.hash(password, 10);
    const data = await User.create({
      name,
      email,
      password: hashedPW,
      admin: false,
    });
    res.status(201).json({
      status: "success",
      message: "User was created successfully.",
      data,
    });
  } catch (error) {
    res
      .status(500)
      .send("Please provide all neccessary data for submitting a new User.");
  }
};
