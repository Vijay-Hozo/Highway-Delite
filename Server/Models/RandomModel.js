const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const mailSender = require("../Middleware/MailSender");

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60*5,
    },
})

// async function sendVerificationEmail(email,otp) {
//     try{
//         const mailResponse = await mailSender(
//             email,
//             "OTP for verification",
//             `<p>Welcome to HopOn! We're excited to have you join our community.</p>,
//             <h1>Please Confirm Your OTP </h1>
//             <h1>Your OTP for verification is ${otp}</h1>
//             <p>Thank you for choosing us,
//             </p>`
//         )
//     }
//     catch(err){
//         console.log(err)
//     }
// }

// otpSchema.pre("save", async function(next) {
//     if(this.isNew){
//         await sendVerificationEmail(this.email,this.otp)
//     }
//     next();
// })

const RandomModel = mongoose.model("Random",otpSchema);

module.exports = RandomModel;
