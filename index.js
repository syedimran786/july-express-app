const express = require('express');
require('dotenv').config();
require('./adapters/connectionDb');
const StudentRoutes = require('./routes/student.routes');
const teacherRoutes = require('./routes/teacher.routes');
const userRoutes = require('./routes/user.routes');
const aluminiRoutes = require('./routes/alumini.routes');
const taskRoutes = require('./routes/task.routes');
const cors = require('cors')





console.log("hello")
let app=express();

app.use(cors())

//! It is used to accept json data from the req body
app.use(express.json())

//! Serves static file from our server
app.use(express.static('./public/'))

//? Students Routes
app.use("/api/student",StudentRoutes)

//? Teacher Routes
app.use("/api/teacher",teacherRoutes)

//? User Routes
app.use("/api/user",userRoutes)

//? Alumini Routes
app.use("/api/alumini",aluminiRoutes)

//? Task routes
app.use("/api/task",taskRoutes)


//! Page Not Found Middleware
app.use("*",(req,res,next)=>
{
  res.status(404).json({error:true,message:"Page Not Found"})
})

//! Error Handling Middleware

app.use((err,req,res,next)=>
{
  res.status(400).json({error:true,message:err.message,data:"OK"})
})

let PORT=process.env.PORT
app.listen(PORT,()=>
{
    console.log(`Server is Running on PORT ${PORT}`)
})