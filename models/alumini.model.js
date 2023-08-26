const mongoose = require('mongoose');



//! Creation of Structure or schema for student collection 
let aluminiSchema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: [true,"Name is Mandatory"],
            minLength:[4,"Name Should Contain Atleast 4 Characters"],
            maxLength:[10,"Name Should Contain Only 10 Characters"],

        },
        yearofpassout:
        {
            type: Number,
            required: true,
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
        department:{
            type:String,
            required:true,
        },
        profile:
        {
            type:String,
            required:true,
        }
       
    },
)


//! creating collection

module.exports=new mongoose.model("alumini",aluminiSchema)