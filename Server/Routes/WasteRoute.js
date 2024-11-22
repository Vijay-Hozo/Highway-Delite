const express = require("express");
const Router = require("express").Router();
const WasteController = require("../Controllers/WasteController");
const UserAuth = require("../Middleware/UserAuth");

Router.post("/waste",UserAuth, WasteController.addwaste);
Router.get("/waste", WasteController.getwaste);
Router.put("/waste/:id",UserAuth, WasteController.updatewaste);
Router.delete("/waste/:id",UserAuth, WasteController.deletewaste);

module.exports = Router;