const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, text) => {
    try{
        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            host: "smtp.gmail.com",
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASSWORD
            }
        })
        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: title,
            html: text
        }
        await transporter.sendMail(mailOptions)
    }
    catch(err){
        console.log(err)
    }
}

module.exports = mailSender;