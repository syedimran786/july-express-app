const {Schema,model} = require('mongoose');


let taskSchema=new Schema({
userId:{
    type:String,
    required:true
},
tname:{
    type:String,
    required:true
}
},{timestamps:true})

module.exports=new model("task",taskSchema)