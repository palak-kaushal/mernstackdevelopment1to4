const User = require("./userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("../../config/nodemailer");
require("dotenv").config();


// Create User
const createUser = async (req, res) => {
  try {
    const { name, email, address, contact, password } = req.body;

    // Access files from req.files
    const image = req.files?.image?.[0]?.filename;
    const pancard = req.files?.pancard?.[0]?.filename;
    const addharcard = req.files?.addharcard?.[0]?.filename;

    const validation = [];
    if (!name || typeof name !== "string") validation.push("name is required and must be string ");
    if (!email || typeof email !== "string") validation.push("email is required and must be string ");
    if (!address || typeof address !== "string") validation.push("address is required and must be string ");
    if (!contact || typeof contact !== "string") validation.push("contact is required and must be string ");
    if (!password || typeof password !== "string") validation.push("password is required and must be string ");

    if (validation.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: validation,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      address,
      contact,
      image,
      pancard,
      addharcard,
    });

    await user.save();
    res.status(201).json({
      success: true,
      message: "New user created successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};


// Login User
const loginUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ name, email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid user",
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(401).json({
        success: false,
        message: "Password is not valid",
      });
    }

    const token = jwt.sign(
      { userId: user._id, userName: user.name, userEmail: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "User logged in successfully",
      token,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: err.message,
    });
  }
};


// Get All Users
const getAllUser = async (req, res) => {
  try {
    let { limit = 3, page = 1 } = req.query;
    limit = parseInt(limit);
    page = parseInt(page);

    const skip = (page - 1) * limit;
    const users = await User.find().skip(skip).limit(limit);
    const totalDocument = await User.countDocuments();

    res.json({
      success: true,
      message: "All users fetched successfully",
      data: users,
      pagination: {
        totalDocument,
        currentPage: page,
        totalPage: Math.ceil(totalDocument / limit),
        perPage: limit,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: err.message,
    });
  }
};


// Get User by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "ID is required" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
};


// Update User
const updateUserById = async (req, res) => {
  try {
    const { id, ...data } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "ID is required" });
    }

    const user = await User.findByIdAndUpdate(id, data, { new: true });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
};


// Delete User
const deleteUserById = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "ID is required" });
    }

    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "User deleted successfully",
      data: deleteUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
};


// Send OTP
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "Invalid email ID" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expire = Date.now() + 5 * 60 * 1000; // 5 minutes expiry

    user.otp = otp;
    user.otpExpire = expire;
    await user.save();

    await sendMail(user.email, "Your OTP Code", `Your OTP is: ${otp}`);

    res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error sending OTP", error: err.message });
  }
};


// Verify OTP
const verifyOtp = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || Date.now() > user.otpExpire) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    if (newPassword) {
      const hashed = await bcrypt.hash(newPassword, 10);
      user.password = hashed;
    }

    user.otp = "";
    user.otpExpire = null;
    await user.save();

    res.json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error verifying OTP", error: err.message });
  }
};


module.exports = {
  createUser,
  loginUser,
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserById,
  sendOtp,
  verifyOtp,
};
