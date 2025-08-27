const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        default:""
    },
    content:{
        type:String,
        default:""
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }


})

const Post = mongoose.models.Post || mongoose.model("Post",postSchema)
module.exports = Post