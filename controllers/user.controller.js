const { invitaionMail, sendOtp } = require('../helpers/mailHelper');
const { createOtp } = require('../helpers/otpHelper');
const User = require('../models/user.model')
const bcryptjs = require('bcryptjs')


let createUser=async (req,res,next)=>
{
    try
    {
        let {fullname,email,role}=req.body;
        
        let isUserAvailable=await User.findOne({email});

            if(isUserAvailable)
            {
                return res.status(500).json({error:true,message:"User Already Exists"})
            }


            let user=await User.create({fullname,email,role})
            invitaionMail(email,fullname,role)

            return res.status(201).json({error:false,message:"User Added Successfully",data:user})

    }
    catch(err)
    {
        next(err)
    }
}


let loginUser=async (req,res,next)=>
{
    try
    {
        let {email}=req.body
        let isUserAvailable=await User.findOne({email});

            if(!isUserAvailable)
            {
                return res.status(500).json({error:true,message:`User Not Found with given email ${email}`})
            }

            let {hashedotp,otp}=await createOtp();   
            console.log(hashedotp,otp)       
            let user=await User.findOneAndUpdate({email},
                {hashedotp},{new:true,runValidators:true})

                sendOtp(email,otp,user.fullname)

            return res.status(201).json({error:false,message:"OTP sent Successfully to your email"})

    }
    catch(err)
    {
        next(err)
    }
}

let userVerification=async (req,res,next)=>
{
    try
    {
        let {email,otp}=req.body;

        let isUserAvailable=await User.findOne({email});

        if(!isUserAvailable)
        {
            return res.status(500).json({error:true,message:`User Not Found with given email ${email}`})
        }
       
        let isTrue=await bcryptjs.compare(otp, isUserAvailable.hashedotp)

        if(isTrue)
        {
            return res.status(200).json({error:false,message:"OTP Verified Successfully"})
        }

        return res.status(500).json({error:true,message:"OTP Verification Failed!!!!"})

    }
    catch(err)
    {
        next(err)
    }
}

module.exports={
    createUser,
    loginUser,
    userVerification
}