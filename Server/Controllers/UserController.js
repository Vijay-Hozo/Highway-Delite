const UserModel = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ status: "failure", message: "User already exists" });
    }
    user = new UserModel({
      first_name,
      last_name,
      email,
      password,
    });

    if (!first_name || !last_name || !email || !password) {
      return res
        .status(400)
        .json({ status: "failure", message: "Please enter all fields" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        status: "failure",
        message: "Password should be atleast 6 characters",
      });
    }

    await user.save();
    res.status(200).json({
      status: "success",
      message: "User registered successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
};

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
        .json({ status: "failure", message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, "secret_key", {
      expiresIn: "8h",
    });
    res.status(200).json({
      status: "success",
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "failure", msg: "Server Error" });
  }
};

module.exports = { register, login };
