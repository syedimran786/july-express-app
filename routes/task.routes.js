const express = require('express');
const { addTask } = require('../controllers/task.controller');
const {auth} = require('../services/authService')

let router=express.Router();

router.post("/addtask",auth,addTask);

module.exports=router