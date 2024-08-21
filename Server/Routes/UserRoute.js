const express = require("express");
const Router = express.Router();
const UserAuth = require("../Middleware/UserAuth");
const UserController = require("../Controllers/UserController");

Router.post("/register", UserController.register);
Router.post("/login", UserController.login);

module.exports = Router;