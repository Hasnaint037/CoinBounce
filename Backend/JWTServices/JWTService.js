let jwt=require("jsonwebtoken");
let tokenModel=require('../Schema/token')

class JWTService{

    static createAccessToken(payload,time){
        return jwt.sign(payload,"Hasnain",{expiresIn:time});
    }

    static createRefreshToken(payload,time){
        return jwt.sign(payload,"Hasnain",{expiresIn:time});
    }

    static verifyAccessToken(token){
        return jwt.verify(token,"Hasnain");
    }

    static verifyRefreshToken(token){
        return jwt.verify(token,"Hasnain");
    }

    static async storeRefreshToken(token,id){
       
            let success=new tokenModel({
                token:token,
                userId:id
            });
            await success.save();
    }
}
module.exports=JWTService;