const mongoose = require('mongoose');



//! Creation of Structure or schema for student collection 
let studentSchema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: [true,"Name is Mandatory"],
            minLength:[4,"Name Should Contain Atleast 4 Characters"],
            maxLength:[10,"Name Should Contain Only 10 Characters"],

        },
        age:
        {
            type: Number,
            required: true,
            min:[18,"Minimum age should be 18 and you entred {VALUE}"],
            max:[30,"Maximum age should be 30 and you entred {VALUE}"]    
        },
        gender:
        {
            type: String,
            required: true,
            enum:{
                values:["male","female","others"],
                message:"Only male,female,other allowed and you entered {VALUE}"
            },
            
        },
        email:{
            type:String,
            required:true,
            unique:true
        }
    },
    {timestamps:true}
)


//! creating collection

module.exports=new mongoose.model("student",studentSchema)