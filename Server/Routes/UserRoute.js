const express = require("express");
const Router = express.Router();
const UserAuth = require("../Middleware/UserAuth");
const UserController = require("../Controllers/UserController");

Router.post("/register", UserController.register);
Router.post("/login", UserController.login);
Router.post("/verify", UserController.verifyuser);
Router.get("/profile", UserAuth, UserController.getuser);
Router.post("/forgotpassword", UserController.forgotpassword);
Router.put("/resetpassword", UserController.resetpassword);

module.exports = Router;