const User = require("./userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const createUser = async(req,res) =>{
    try{
        const {name,email,address,contact,password} = req.body
        const validation = []
        if(!name || typeof name !== "string"){
            validation.push("name is required and type must be string")
        }
        if(!email || typeof email !== "string"){
            validation.push("email is required and type must be string")
        }
        if(!address || typeof address !== "string"){
            validation.push("address is required and type must be string")
        }
        if(!contact || typeof contact !== "string"){
            validation.push("conatct is required and type must be string")
        }
        if(!password || typeof password !== "string"){
            validation.push("password is required and type must be string")
        }

        if(validation.length>0){
            return res.json({
                status:400,
                success:false,
                message:"validation error",
                error:validation
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = new User({
            name:name,
            email:email,
            password:hashedPassword,
            address:address,
            contact:contact
        })

        await user.save()
        res.json({
            status:201,
            success:true,
            message:"new user is create successfully",
            data:user
        })

    }catch(err){
          res.json({
            status:500,
            success:false,
            message:"internal server error",
            error:err.message
          })
    }
}

const loginUser = async(req,res) =>{
    try{
        const {email,password} = req.body 
        const user = await User.findOne({email})
        if(!user){
            return res.json({
                status:404,
                success:false,
                message:"it is not valid user"
            })
        }

       // matched password 
       const matchPassword = await bcrypt.compare(password,user.password)
       if(!matchPassword){
        return res.json({
            status:404,
            success:false,
            message:"password is not valid"
        })
       }

       //create a token 
const token = jwt.sign(
    {userId:user._id,userEmail:user.email},
    process.env.SECRET_KEY,
    {expiresIn:"1d"}
)
res.json({
    status:200,
    success:true,
    message:"user is login successfully",
    token
})
    }catch(err){
res.json({
    status:500,
    success:false,
    message:"internal server error",
    error:err.message
})
    }
}


module.exports = {createUser,loginUser}