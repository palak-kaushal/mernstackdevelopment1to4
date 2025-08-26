const express = require("express")
const router = express.Router()
const { createUser, loginUser, getAllUser, getUserById, updateUserById, deleteUserById } = require("../api/user/userController")

router.post("/createuser", createUser)
router.post("/loginuser", loginUser)
router.get("/getAlluser", getAllUser)
router.get("/getuserByid", getUserById)
router.put("/updateUserById", updateUserById)
router.post("/deleteUserById", deleteUserById)




module.exports = router