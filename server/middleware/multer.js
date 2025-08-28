const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"..","public","uploads"))
    },
    filename:function(req,file,cb){
        const suffixName = Date.now() + "-" + Math.round(Math.random()*100000)
        const extName = path.extname(file.originalname)
        cb(null,file.fieldname+suffixName+extName)
    }
})

const upload = multer({storage:storage})

module.exports = upload