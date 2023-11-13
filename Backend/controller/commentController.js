let Joi=require('joi');
let comment=require('../Schema/comment');
let DTO=require('../DTO/commentDTO');


let mongoDbIdPattern=/^[0-9a-fA-F]{24}$/;
let commentController={


    // create comments
    async create(req,res,next){

        let validationObject=Joi.object({

            content:Joi.string().required(),
            author:Joi.string().regex(mongoDbIdPattern).required(),
            blog:Joi.string().regex(mongoDbIdPattern).required()
            
        })

        let error=validationObject.validate(req.body);

        if(error.error){

            return next(error.error.details[0]);

        }

        let {author,content,blog}=req.body;

        try{

            let savedComment=new comment({author,blog,content});
            await savedComment.save();

        }
        catch(error){

            return next(error);

        }

        res.status(201).json({message:"Comment created successfuly"});

    },


    // get by id comments
    async getById(req,res,next){

        let validationObject=Joi.object({


            id:Joi.string().regex(mongoDbIdPattern).required()

        })

        let error=validationObject.validate(req.params);

        if(error.error){

            return next(error.error.details[0]);
        }

        let {id}=req.params;

        let findComment;
        let comments=[];
        // we created array bcz a blog can have multiple comments

        try{

            findComment=await comment.find({blog:id}).populate('author');

        }
        catch(error){

            return next(error);

        }

        //there will be a dto for each comment and then push to array
        for(let i=0;i<findComment.length;i++){

            let dto=new DTO(findComment[i]);

            comments.push(dto);

        }


        
        res.status(200).json({data:findComment});

    }

}

module.exports=commentController;