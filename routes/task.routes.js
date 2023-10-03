const express = require('express');
const { addTask, getAllTask,
    getSingleTask,
    updateTask,
    deleteTask } = require('../controllers/task.controller');
const {auth} = require('../services/authService')

let router=express.Router();

router.post("/addtask",addTask);
router.get("/tasks",getAllTask);
router.get("/task/:id",getSingleTask);
router.put("/updatetask/:id",updateTask);
router.delete("/deletetask/:id",deleteTask);


module.exports=router