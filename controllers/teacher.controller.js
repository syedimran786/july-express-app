const { invitaionMail } = require('../helpers/mailHelper');
const Teacher = require('../models/teacher.model');



let registerTeacher=async (req,res,next)=>
{
    try
    {

        let {name,email,password}=req.body;

     

        //? returns the document if condition satisfies else return null
        let isTeacherAvailable=await Teacher.findOne({email});

        if(!isTeacherAvailable)
        {

            //! Email Code
            invitaionMail(email,name)
            //! Email Code
            let teacher=await Teacher.create({name,email,password})
           
            return res.status(201).json({error:false,message:"Teacher Added Successfully",
            data:{name:teacher.name,email:teacher.email}})
        }
        res.status(409).json({error:true,message:"Teacher Already Exist"})
        
    }
    catch(err)
    {
        next(err)
    }
}

let logoinTeacher=async (req,res,next)=>
{
    try
    {
        let {email,password}=req.body

        let isTeacherAvailable=await Teacher.findOne({email});
        
        if(!isTeacherAvailable)
        {
            return res.status(404).json({error:true,message:"No Teacher Found with Given Mail Id"})
        }
        
        let hashedPassword=await isTeacherAvailable.compareMyPassword(password)

        if(hashedPassword)
        {
            return res.status(201).json({error:false,message:"Login Successfull"})
        }
        else
        {
            return res.status(401).json({error:true,message:"Invalid Password"})

        }

        
    }
    catch(err)
    {
        next(err)
    }
}

module.exports=
{
    registerTeacher,
    logoinTeacher
}