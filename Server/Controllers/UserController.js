const UserModel = require('../Models/UserModel')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailSender = require("../Middleware/MailSender");
const otpGenerator = require("otp-generator");
const OtpModel = require("../Models/OtpModel")
// Register endpoint
const register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ status: "failure", message: "User already exists" });
    }

    if (!first_name || !last_name || !email || !password) {
      return res
        .status(400)
        .json({ status: "failure", message: "Please enter all fields" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        status: "failure",
        message: "Password should be at least 6 characters",
      });
    }

    user = new UserModel({
      first_name,
      last_name,
      email,
      password,
    });

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let result = await OtpModel.findOne({ otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OtpModel.findOne({ otp });
    }

    const emailBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #28a745;">Welcome to Highway Deliter!</h2>
      <p>Dear User,</p>
  
      <p>We’re thrilled to have you join the Highway Deliter community. To complete your registration, please use the OTP below to verify your email address:</p>
  
      <p style="font-size: 20px; color: #28a745;"><strong>${otp}</strong></p>
  
      <p>This OTP is valid for the next 10 minutes. Please enter it in the required field to complete your verification process.</p>
  
      <p>If you did not request this verification, please ignore this email or contact our support team for assistance.</p>
  
      <p>Thank you for choosing Highway Deliter. We’re excited to have you on board and look forward to helping you with your MERN stack needs.</p>
  
      <p style="font-weight: bold;">Best regards,<br>The Highway Deliter Team</p>
  
      <hr style="border: none; border-top: 1px solid #ccc;" />
  
      <p style="font-size: 12px; color: #777;">This email was sent to you by Highway Deliter. If you did not sign up for our services, please disregard this email.</p>
    </div>
  `;
  
    await user.save();
    await mailSender(email, "Your OTP Code", emailBody);
    res.status(200).json({
      status: "success",
      message: "Please enter the OTP sent to your email.",
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Verify OTP endpoint
const verifyuser = async (req, res) => {
  const { otp, email } = req.body;
  try {
    const otpEntry = await OtpModel.findOne({ email }).sort({ createdAt: -1 });
    
    if (!otp || !otpEntry) {
      return res.status(400).json({
        status: "failure",
        message: "Please enter the OTP",
      });
    }

    if (otp !== otpEntry.otp) {
      return res.status(400).json({
        status: "failure",
        message: "The OTP is not valid",
      });
    }

    await OtpModel.deleteMany({ email });

    const user = await UserModel.findOne({ email });

    if (user) {
      const token = jwt.sign({ id: user._id }, "secret_key", {
        expiresIn: "8h",
      });

      return res.status(200).json({
        status: "success",
        message: "OTP verified successfully. Your registration is complete.",
        token,  
      });
    } else {
      return res.status(404).json({
        status: "failure",
        message: "User not found",
      });
    }
  } catch (err) {
    res.status(500).json({ status: "failure", message: "Server Error" });
  }
};


//Login a user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ status: "failure", message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ status: "failure", message: "Password is not valid" });
    }

  const token = jwt.sign({ id: user._id }, "secret_key", {
      expiresIn: "8h",  
    });
    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({ status: "failure", message: "Server Error" });
  }
};

//Get a user
const getuser = async (req, res) => {
  const user_id = req.user.id;
  try {
    const user = await UserModel.findOne({ _id: user_id });
    if (!user) {
      return res
        .status(400)
        .json({ status: "failure", message: "User not found" });
    }
    res.status(200).json({ status: "success", message: "User found", user });
  } catch (err) {
    res.status(500).json({ status: "failure", message: "Server Error" });
  }
};

//forgot password
const forgotpassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let result = await OtpModel.findOne({ otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OtpModel.findOne({ otp });
    }

    const otppayload = { email, otp };
    const otpbody = await OtpModel.create(otppayload);

    const emailBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #28a745;">Password Reset Request</h2>
      <p>Dear User,</p>
  
      <p>We received a request to reset the password for your Highway Deliter account. To complete this process, please use the link below:</p>
  
      <p style="font-size: 20px; color: #28a745;"><strong>${otp}</strong></p>
  
      <p>This link is valid for the next 10 minutes. If the link expires or you need to reset your password again, please request a new reset.</p>
  
      <p>If you did not request a password reset, please ignore this email or contact our support team for assistance.</p>
  
      <p>Thank you for being a part of Highway Deliter. We’re here to support you with all your MERN stack needs.</p>
  
      <p style="font-weight: bold;">Best regards,<br>The Highway Deliter Team</p>
  
      <hr style="border: none; border-top: 1px solid #ccc;" />
  
      <p style="font-size: 12px; color: #777;">This email was sent to you by Highway Deliter. If you did not request a password reset, please disregard this email.</p>
    </div>
  `;
  
    await mailSender(email, "Your OTP Code", emailBody);
    res.status(200).json({
      status: "success",
      message: "Please enter the OTP sent to your email.",
      otpbody
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//reset password
const resetpassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otpEntry = await OtpModel.findOne({ email }).sort({ createdAt: -1 }).limit(1);

    if (!otp || !otpEntry) {
      return res.status(400).json({ message: "Please enter the OTP" });
    }
    if (otp !== otpEntry.otp) {
      return res.status(400).json({ message: "The OTP is not valid" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await UserModel.findOneAndUpdate({ email }, { password: hashedPassword });
    await OtpModel.deleteMany({ email });

    res.status(200).json({status:"success", message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({status:"failure", message: "Server error" });
  }
};


module.exports = {
  register,
  login,
  forgotpassword,
  resetpassword,
  getuser,
  verifyuser,
};
