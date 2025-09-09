import userModel from "../models/users.js";
import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { name, password } = req.body;

  const userSchema = Joi.object({
    name: Joi.string().required().messages({
      "string.empty": "Name is required",
    }),
    password: Joi.string().min(8).max(16).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must be at most 16 characters long",
    }),
  });
  try {
    const isValid = userSchema.validate(req.body);
    if (isValid.error) {
      return res
        .status(400)
        .json({ message: isValid.error.details[0].message });
    }

    const isExistUser = await userModel.findOne({ name });
    if (isExistUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({ name, password: hashedPassword });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const loginUser = async (req, res) => {
  const { name, password } = req.body;
  try {
    const isExistUser = await userModel.findOne({ name });
    if (!isExistUser) {
      return res.status(400).json({ message: "Incorrect account or password" });
    }
    const isMatch = await bcrypt.compare(password, isExistUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect account or password" });
    }
    const token = jwt.sign({ id: isExistUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      isSuccess: true,
      userName: isExistUser.name,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
