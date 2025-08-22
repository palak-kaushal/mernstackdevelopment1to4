const express = require("express")
const router = express.Router()
const {createUser,loginUser} = require("../api/user/userController")

router.post("/createuser",createUser)
router.post("/loginuser",loginUser)



module.exports = router