let mongoose=require('mongoose');
let {Schema}=mongoose;

let tokenSchema=new Schema({
    token:{type:String,required:true},
    userId:{type:mongoose.SchemaTypes.ObjectId,required:true}
},
    {timestamps:true}
)

module.exports=mongoose.model("RefreshToken",tokenSchema,"tokens");