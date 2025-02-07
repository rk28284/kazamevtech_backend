const UserModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi"); // Import Joi
require("dotenv").config();

// Validation schema
const schema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(), 
  password: Joi.string().min(6).required(),
  name: Joi.string().optional(),
  bio: Joi.string().optional(),
  avatar: Joi.string().optional(),
});

const registerUser  = async (req, res) => {
  const { username, email, password, name, bio, avatar } = req.body;

  // Validate input
  const { error } = schema.validate({ username, email, password, name, bio, avatar });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        return res.status(500).json({ message: "Error hashing password" });
      }

      const user = new UserModel({ username, email, name, bio, avatar, password: hash });

      await user.save();
      res.status(201).json({ message: "User  registered successfully", user });
    });
  } catch (error) {
    res.status(500).json({ message: "Error in registering user", error });
  }
};

const loginUser  = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(400).json({ message: "Wrong credentials, try again" });
      }

      const token = jwt.sign({ userID: user.id }, process.env.key, { expiresIn: "1h" });

      res.status(200).json({ message: "Login successful", token });
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try again", "Error":error });
  }
};


module.exports =  {registerUser , loginUser } ;