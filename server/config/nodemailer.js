const nodemailer = require("nodemailer")
require("dotenv").config()
const sendMail = async(email,subject,message) => {
    try{
        const transporter = nodemailer.createTransport({
            service:"gmail",
            security:true,
            port:465,
            auth:{
                user:"process.env.EMAIL",
                pass:"process.env.EMAIL_PASS"
            }
        })

        const receiver = {
            from:process.env.EMAIL,
            to:email,
            subject,
            text:message
        }

        const info = await transporter.sendMail(receiver)
        console.log(info,info.response)
        return{
            success:true,
            message:"email sent successfully"
        }


    }
    catch(err){
        return{
            success:false,
            message:"failed to send email"
        }

    }
}

module.exports = sendMail