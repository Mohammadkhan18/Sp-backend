import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (typeof password !== "string") {
      return res.status(400).json({ message: "Password must be a string" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    
    const userObj = user.toObject();

    delete userObj.password;

    res
      .status(201)
      .json({ message: "User created successfully", data: userObj });
  } catch (err) {
   
    res.status(500).json({
      message: "An error occurred while creating the user",
      error: err.message,
    });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

  
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

   
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }


    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

   
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred during login",
      error: err.message,
    });
  }
};

// Get a single user by ID
export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

   
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User fetched successfully", data: user });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while fetching the user",
      error: err.message,
    });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res
      .status(200)
      .json({ message: "Users fetched successfully", data: users });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while fetching the users",
      error: err.message,
    });
  }
};

// Update a user by ID
export const updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, role } = req.body;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();

    res.status(200).json({ message: "User updated successfully", data: user });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while updating the user",
      error: err.message,
    });
  }
};

// Delete a user by ID
export const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.remove();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while deleting the user",
      error: err.message,
    });
  }
};
