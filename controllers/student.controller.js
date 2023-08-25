//! Collection
let Student = require("../models/student.model");
const Joi = require('joi');

const jwt = require('jsonwebtoken')


let studentSchema = Joi.object({
    name: Joi.string().min(4).required().messages({
        "string.base":"Name Must String",
        "string.min":"Name Should Contain Minimum 4 Characters",
        "string.empty":"NAme is Mandatory"

    }),
    age: Joi.number().required(),
    gender: Joi.string().required(),
    email: Joi.string().required().email(),
    fees: Joi.number().required(),
    marks: Joi.number().required()

})

//! Adding Student

let createStudent = async (req, res, next) => {
    try {
        let { name, age, gender, email ,fees,marks} = req.body
        console.log({name, age, gender, email ,fees,marks})

        let {value,error}=studentSchema.validate({name, age, gender, email,fees,marks})

        console.log(value)
        console.log("--------------------------")
        console.log(error)
        if(error)
        {
           return res.status(400).json({error:true,message:error.message})
        }
else
{
    let student=await Student.create(value);
    res.status(201).json({message:"Student Added Successfully",data:student})
}
    }
    catch (err) {
       next(err)
    }
}


//! Getting All The Students


let getStudents = async (req, res, next) => {
  try
  {
    let {gender,studentname,fees,sort,fields,page,limit}=req.query;
   
    let queryObject={}

    if(gender)
    {
        queryObject.gender=gender
    }

    if(studentname)
    {
        //! getting all the students whose name is equal to studentname
        // queryObject.name=studentname;
        //! getting all the students whose name includes studentname
        queryObject.name={$regex:studentname,$options:"i"}
    }

    if(fees)
    {
        queryObject.fees=Number(fees)
    }


   
    //! Dont use await keyword because it wauts till it gets the response and it allows if else block to excecute
    let allStudents =Student.find(queryObject);

    if(sort)
    {
        allStudents=allStudents.sort(sort);
    }
    else
    {
        allStudents=allStudents.sort("age")
    }

    if(fields)
    {
        
        let splittedFields=fields.split(",").join(" ")
        allStudents=allStudents.select(splittedFields+" -_id")
    }

    if(!page && !limit)
    {
        allStudents=await allStudents
        res.status(200).json({count:allStudents.length,error: false, 
            message: "Students Fetched Successfully", data: allStudents })
    
    }
//! Pagination starts
let newPage=page || 1;
let newLimit=limit || 4;
// let newskip=(newPage-1)*4
let newskip=(newPage-1)*newLimit

//! Pagination Ends
    allStudents=await allStudents.skip(newskip).limit(newLimit)
    res.status(200).json({count:allStudents.length,error: false, 
        message: "Students Fetched Successfully", data: allStudents })

  }
  catch(err)
  {
    next(err)
  }
}

//! getting one stundet

let getOnStudent = async (req, res, next) => {
    let { sid } = req.params;

    console.log(sid)

    //! below methods return null if there is no match else returns matched document
    //    let singleStudent=await Student.findById(sid);
    // let singleStudent=await Student.findOne({_id:sid});
    let singleStudent = await Student.findOne({ name: sid });

    //! Checking whether student is avaialble or not
    if (!singleStudent) {
        return res.status(404).json({ error: true, message: "No Student Found with Given Name", data: null })
    }

    return res.status(200).json({ error: false, data: singleStudent })
}

//! Updating Student

let editStudent = async (req, res, next) => {
    try
    {
        // let {name,age,gender}=req.body;
    let { name } = req.body;

    let { sid } = req.params
    
    let singleStudent = await Student.findById(sid);

    //! Checking whether student is avaialble or not
    if (!singleStudent) {
        return res.status(404).json({ error: true, message: `No Student Found with Given ID ${sid}`, data: null })
    }


    let updatedStudent = await Student.findOneAndUpdate({ _id: sid }, { name }, {
        new: true,
        runValidators: true
    })

    console.log(req.body)
    console.log(req.params)

    res.status(200).json({ error: false, message: `${updatedStudent.name.toUpperCase()} age Updated from ${singleStudent.age} to ${updatedStudent.age} Successfully`, data: updatedStudent,
updatedBy:data.email })
    }
    catch(err)
    {
        next(err)
    }
}


//! Deleteing Single Student
let deleteStudent = async (req, res, next) => {
    //! sid is having _id
    let { sid } = req.params;
    let isAvailable = await Student.findById(sid)

    if (!isAvailable) {
        return res.status(404).json({ error: true, message: `No Student Found with Given ID ${sid}`, data: null })
    }

    let deletedStudent = await Student.findOneAndDelete({ _id: sid })

    res.status(200).json({ error: false, message: `Student Deleted Successfully`, data: deletedStudent })

}
module.exports = {
    createStudent,
    getStudents,
    getOnStudent,
    editStudent,
    deleteStudent
}