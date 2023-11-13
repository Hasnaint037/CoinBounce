let {ValidationError}=require('joi');

const errorHandler=(error,req,res,next)=>{
    let status=409;
    let data={
        message:"Some error occured"
    }
    if(error instanceof ValidationError){
        // status=error.status;
        data.message=error.message;
       return res.status(status).json(data)
    }

    if(error.status){
        status=error.status;
        data.message=error.message;

    }
    
    if(error.message){
        data.message=error.message;
    }
    return res.status(status).json(data)
}

module.exports=errorHandler;