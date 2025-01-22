const express = require("express")
const usersRoute = express.Router()
const users= require("../data/users")

usersRoute.get(('/'),(req, res) => {
    res.json(users);
  });

module.exports=usersRoute;