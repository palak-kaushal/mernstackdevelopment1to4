const express = require("express")
const router = express.Router()
const {createUser,loginUser ,getAllUser,getUserById ,updateUserById,deleteUserById} = require("../api/user/userController")

router.post("/createuser",createUser)
router.post("/loginuser",loginUser)
router.post("/getAlluser",getAllUser)
router.post("/getuserByid",getUserById)
router.post("/updateUserById",updateUserById)
router.post("/deleteUserById",deleteUserById)




module.exports = router