const express = require("express")
const router = express.Router()
const { createUser, loginUser, getAllUser, getUserById, updateUserById, deleteUserById } = require("../api/user/userController")

const {createPost,getAllPost} = require("../api/post/postController")
const upload = require("../middleware/multer")


router.post("/createpost",createPost)
router.post("/getallpost",getAllPost)
router.post(
  "/createuser",
  upload.fields([
    { name: "image", maxCount: 2 },
    { name: "pancard", maxCount: 2 },
    { name: "addharcard", maxCount: 2 }
  ]),
  createUser
);


router.post("/loginuser", loginUser)
router.get("/getAlluser", getAllUser)
router.get("/getuserByid", getUserById)
router.put("/updateUserById", updateUserById)
router.post("/deleteUserById", deleteUserById)




module.exports = router