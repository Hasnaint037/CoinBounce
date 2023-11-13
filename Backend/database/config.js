let mongoose=require("mongoose");
let dot=require('dotenv').config();
let dbString=process.env.dbString;
let connect=async()=>{
    try{
        await mongoose.connect(dbString);
        console.log("database connected");
    }catch(error){
        console.log("error occured")
    }
}
module.exports=connect;