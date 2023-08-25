const express = require("express");
const { createStudent,getStudents, getOnStudent, editStudent, deleteStudent } = require("../controllers/student.controller");
const { auth } = require("../services/authService");

let router=express.Router()


router.post("/addstudent",createStudent)
router.get("/getstudents",getStudents)
router.get("/getsinglestudent/:sid",getOnStudent)
router.put("/updatestudent/:sid",auth,editStudent)
router.delete("/deletestudent/:sid",deleteStudent)



module.exports=router