const User = require("../api/user/userModel");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const createAdmin = async (req, res) => {
  try {
    // check if admin already exists
    const user = await User.findOne({ email: process.env.ADMIN_EMAIL });

    if (user) {
      console.log("Admin already exists");
      return; // stop execution if already exists
    }

    // hash password
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    // create new admin
    const admin = new User({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      contact: process.env.ADMIN_CONTACT,
      address: process.env.ADMIN_ADDRESS,
    });

    await admin.save();
    console.log("Admin created successfully");
  } catch (err) {
    console.log("Admin is not created due to error:", err.message);
  }
};

module.exports = { createAdmin };
