const JWTService = require("../JWTServices/JWTService");
let user=require('../Schema/users');
let dto=require('../DTO/userDTO');

let auth=async (req,res,next)=>{
    // getting access and refresh token

    let {accessToken,refreshToken}=req.cookies;

    if(!accessToken || !refreshToken){
        let error={
            status:401,
            message:"unauthorized"
        }

        next(error);
    }

    
    let {id}=JWTService.verifyAccessToken(accessToken);
    let userFind=await user.findOne({_id:id});
    let finalUser=new dto(userFind);
    console.log(finalUser);
    req.user=finalUser;
    next();
 

}
module.exports=auth;