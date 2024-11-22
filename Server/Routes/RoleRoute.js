const express = require("express");
const Router = require("express").Router();
const AuthorizeRoles = require("../Middleware/RoleMiddleware");
const UserAuth = require("../Middleware/UserAuth");


Router.get("/admin",UserAuth, AuthorizeRoles("admin"), (req,res)=>{
    res.json({message : " Welcome Admin "});
}); 

Router.get("/employer",UserAuth,AuthorizeRoles("admin","employer"), (req,res)=>{
    res.json({message : " Welcome manager "});
}); 

Router.get("/user",UserAuth, AuthorizeRoles("admin","user"), (req,res)=>{
    res.json({message : " Welcome User "});
}); 

module.exports = Router;
