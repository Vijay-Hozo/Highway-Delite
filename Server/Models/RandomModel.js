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

const RandomModel = mongoose.model("Random",otpSchema);

module.exports = RandomModel;
