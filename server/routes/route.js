const express = require("express");
const router = express.Router();

const {
  createUser,
  loginUser,
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserById,
  sendOtp,
  verifyOtp,
} = require("../api/user/userController");

const {
  createPost,
  getAllPost,
} = require("../api/post/postController");

const upload = require("../middleware/multer");
const auth = require("../middleware/auth");

// ✅ User Routes
router.post(
  "/createuser",
  upload.fields([
    { name: "image", maxCount: 2 },
    { name: "pancard", maxCount: 2 },
    { name: "addharcard", maxCount: 2 },
  ]),
  createUser
);

router.post("/loginuser", loginUser);
router.get("/getalluser", auth, getAllUser);
router.get("/getuserbyid", getUserById);
router.put("/updateuserbyid", updateUserById);    // better with PUT
router.delete("/deleteuserbyid", deleteUserById); // better with DELETE

// ✅ Post Routes
router.post("/createpost", createPost);
router.get("/getallpost", getAllPost);

// ✅ OTP Routes
router.post("/sendotp", sendOtp);
router.post("/verifyotp", verifyOtp); // fixed spelling

module.exports = router;
