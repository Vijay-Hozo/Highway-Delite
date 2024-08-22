const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, text) => {
    try{
        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            host: "smtp.gmail.com",
            auth: {
                user: "ridehopon@gmail.com",
                pass: "hhfk xmuk pqsh jicw"
            }
        })
        const mailOptions = {
            from: "ridehopon@gmail.com",
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