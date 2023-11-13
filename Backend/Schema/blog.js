let mongoose=require('mongoose');

let blogSchema=new mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    photoPath:{type:String,required:true},
    author:{type:mongoose.SchemaTypes.ObjectID,ref:'User'}
    // ref mein ham us model ka name likhty hain jis sy ref ly rahy hain
},
    {timestamps:true}
)
module.exports=mongoose.model("Blog",blogSchema,'blogs');