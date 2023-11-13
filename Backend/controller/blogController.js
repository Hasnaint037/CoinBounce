let joi=require('joi');
let fs=require('fs');
let blog=require('../Schema/blog');
let DTO=require('../DTO/blogDTO');
let detailDTO=require('../DTO/blogDetails');
const Joi = require('joi');
let comment=require("../Schema/comment");

let mongoDbIdPattern=/^[0-9a-fA-F]{24}$/;
let blogController={

    // for creating blogs
    async create(req,res,next){
        console.log(req.user)

        let blogSchema=joi.object({
            title:joi.string().required(),
            content:joi.string().required(),
            photo:joi.string().required(),
            author:joi.string().regex(mongoDbIdPattern).required()
        })

        const errors = blogSchema.validate(req.body, { abortEarly: false });
        // res.send(error);
    
        if (errors.error) {
          return next(errors.error.details[0]);
        }

        let {title,photo,content,author}=req.body;

        // now we hanlde image in following steps

        // 1. read as buffer(generate as plain text of bits)
        let buffer=Buffer.from(photo.replace(/^data:image\/(png|jpg|jpeg);base64,/,''),'base64')
        // it means base64 has some meta data at start and we have to replace it with empaty string

        // 2. give random name
        let path=`${Date.now()}-${author}.jpg`

        // 3. store locally
        try{
            fs.writeFileSync(`storage/${path}`,buffer);
        }
        catch(error){
            return next(error);
        }

        //save blog to database
        let savedBlog;
        try{

            let Blog=new blog({
                title,
                content,
                author,
                photoPath:`http://localhost:5000/storage/${path}`
            })

           savedBlog= await Blog.save();

        }
        catch(error){

            return next(error);

        }

        //send response

        let dto=new DTO(savedBlog);

        return res.status(200).json({blog:dto});



    },




    // getting all
    async getAll(req,res,next){

        try{

            //find all
            let Blogs=await blog.find({});

            let blogs=[];

            for(let i=0; i<Blogs.length;i++){

                //for each blog we will get a dto an then put into empty array

                let dto=new DTO(Blogs[i]);
    
                blogs.push(dto);
    
            }

            res.status(200).json({blogs:blogs})

        }
        catch(error){

            return next(error);

        }

       
    },




    // getting by id 

    async getById(req,res,next){

        let blogObject=joi.object({

            id:joi.string().regex(mongoDbIdPattern).required()
            
        });

        let errors=blogObject.validate(req.params);

        if (errors.error) {
            return next(errors.error.details[0]);
          }


          let {id}=req.params;

          let blogss;

          try{

          blogss=await blog.findOne({_id:id}).populate("author");
          // is ka matlab hai ky jis author ny blog likha us ki details
       
          }
          catch(error){

            return next(error);

          }

          let blogs=new detailDTO(blogss);
          console.log(blogs)

          res.status(200).json({data:blogs});

    },



    // update

    async updateOne(req,res,next){

        //validate

        let validationObject=Joi.object({

            author:joi.string().regex(mongoDbIdPattern).required(),
            blogId:Joi.string().regex(mongoDbIdPattern).required(),
            title:Joi.string(),
            content:Joi.string(),
            photo:joi.string()

        })

        let error=validationObject.validate(req.body);

        
        if (error.error) {
            return next(error.error.details[0]);
          }

        const {author,blogId,title,content,photo}=req.body;


        let blogUpdate;

        try{

            blogUpdate=await blog.findOne({_id:blogId})

        }
        catch(error){

            return next(error);

        }

       
        // it means base64 has some meta data at start and we have to replace it with empaty string

        // 2. give random name
        // 3. store locally


            await blog.updateOne({_id:blogId},{$set:{title,content}})

        

        res.status(200).json({message:"Blog Updated Successfully"});

    },




    // delete blog

    async delete(req,res,next){


        let validationObject=Joi.object({

            id:Joi.string().regex(mongoDbIdPattern).required()

        })

        let error=validationObject.validate(req.params);

        if(error.error){
            return next(error.error.details[0]);
        }

        let {id}=req.params;

        try{

            await blog.deleteOne({_id:id});

            // it will delete all comments regarding to that particular blog
            await comment.deleteMany({blog:id});

        }
        catch(error){

            return next(error);

        }

        res.status(200).json({message:"Blog deleted successfully"})

    }





}

module.exports=blogController;

