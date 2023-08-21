const express = require('express');
const { registerTeacher, logoinTeacher } = require('../controllers/teacher.controller');

let router=express.Router();


router.post("/addteacher",registerTeacher)
router.post("/loginteacher",logoinTeacher)


module.exports=router