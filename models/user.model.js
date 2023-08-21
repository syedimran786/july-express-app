const {Schema,model} = require('mongoose');

let userSchema=new Schema({
    fullname:{
        type:String,
        required:[true,"Fullname is Mandatory"]
    },
    email:{
        type:String,
        required:[true,"Email is Mandatory"]
    },
    role:{
        type:String,
        required:[true,"Role is Mandatory"],
        enum:["teacher","student","admin"]
    },
    hashedotp:{
        type:String,
        required:[true,"Hashed OTP is Mandatory"],
        default:"null"
    }
},{timestamps:true})

module.exports=new model("user",userSchema)