const express = require('express');
const { registerTeacher, logoinTeacher, getAllTeachers } = require('../controllers/teacher.controller');
const { auth } = require('../services/authService');

let router=express.Router();


router.post("/addteacher",registerTeacher)
router.post("/loginteacher",logoinTeacher)
router.get("/getteachers",auth,getAllTeachers)



module.exports=router