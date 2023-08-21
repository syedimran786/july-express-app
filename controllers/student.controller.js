//! Collection
let Student = require("../models/student.model");
const Joi = require('joi');


let studentSchema = Joi.object({
    name: Joi.string().min(4).required().messages({
        "string.base":"Name Must String",
        "string.min":"Name Should Contain Minimum 4 Characters",
        "string.empty":"NAme is Mandatory"

    }),
    age: Joi.number().required(),
    gender: Joi.string().required(),
    email: Joi.string().required().email()
})

//! Adding Student

let createStudent = async (req, res, next) => {
    try {
        let { name, age, gender, email } = req.body

        let {value,error}=studentSchema.validate({name, age, gender, email})

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
    let allStudents = await Student.find();
    res.status(200).json({ error: false, message: "Students Fetched Successfully", data: allStudents })

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

    res.status(200).json({ error: false, message: `${updatedStudent.name.toUpperCase()} age Updated from ${singleStudent.age} to ${updatedStudent.age} Successfully`, data: updatedStudent })
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