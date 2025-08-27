const express = require("express")
const router = express.Router()
const {createUser,loginUser,getAllUser,getUserById,updateUserById,deleteUserById} = require("../api/user/userController")
const {createPost,getAllPost} = require("../api/post/postController")
const upload = require("../middleware/upload");



router.post("/createuser",createUser)
router.post("/loginuser",loginUser)
router.get("/getalluser",getAllUser)
router.get("/getuserbyid",getUserById)
router.post("/updateUserById",updateUserById)
router.post("/deleteuserbyid",deleteUserById)
router.post("/createpost",createPost)
router.post("/getallpost",getAllPost)
module.exports  = router