const Task = require('../models/task.model')


let addTask=async (req,res,next)=>
{
    try
    {
        let {userId,tname}=req.body;
        console.log("userId")
        userId=req.user._id;

        let task=await Task.create({userId,tname});

        if(task)
        {
            return res.status(201).json({error:false,message:"Task Added Successfully",data:task})
        }
        return res.status(500).json({error:false,message:"invalid task",data:task})
    }
    catch(err)
    {
        next(err)
    }
}

module.exports={
    addTask
}