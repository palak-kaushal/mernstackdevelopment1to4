const Post =require("./postModel")

const createPost = async(req,res) => {
    try{
        const validation = []
        const image =req.file?.filename
        const {title,content,author} = req.body
        if(!title || typeof title !== "string"){
            validation.push("title is required and type must be string")
        }
        if(!content || typeof content !== "string"){
            validation.push("content is required and type must be string")
        }
        if(!author){
            validation.push("author is required ")
        }
        if(validation.length > 0){
            return res.json({
                status:400,
                success:false,
                message:"validation error",
                error:validation
            })
        }

        //
        const newPost = new Post ({
            title,
            content,
            author

        })

        await newPost.save()
        res.json({
            status:201,
            success:true,
            message:"new post is created successfully",
            data:newPost
        })


    }
    catch(err){
        res.json({
            status:500,
            success:false,
            message:"internal server error",
            error:err.message
        })

    }
}

const getAllPost = async(req,res) => {
    try{
        const post = await Post.find().populate("author","name email password")
        res.json({
            status:200,
            success:true,
            message:"all post is get successfully",
            data:post
        })

    }
    catch(err){
        res.json({
            status:500,
            success:false,
            message:"internal server error",
            error:err.message
        })

    }
}

module.exports={createPost,getAllPost}