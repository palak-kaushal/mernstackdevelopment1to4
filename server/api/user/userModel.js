const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        default:""
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    identyProff:{
        type:String,
       required:true,
       default:""

    },
    password:{
       type:String,
       required:true,
       default:""
    },
    contact:{
        type:String,
        required:true,
        default:""
    },
    address:{
        type:String,
        required:true,
        default:""
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const User = mongoose.models.User || mongoose.model("User",userSchema)
module.exports = User