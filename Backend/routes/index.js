let express=require("express");
let auth=require('../controller/auth');
let authentification = require("../middleware/auth");
let blogController=require('../controller/blogController');
let commentController=require('../controller/commentController');

let router=express.Router();

//register user
router.post('/signup',auth.register);

// login user
router.post("/login",auth.login);

//logout user
router.post('/logout',authentification,auth.logout);

//refresh token
router.post('/refresh',auth.refresh);


//create blog
router.post("/create",authentification,blogController.create);

//get all blogs
router.post('/all',authentification,blogController.getAll);

// get by id a particular blog
router.post('/all/:id',authentification,blogController.getById);

// update one blog
router.put("/update",authentification,blogController.updateOne);

// delete particular blog by id
router.delete("/delete/:id",authentification,blogController.delete);


// create comments
router.post("/comment",authentification,commentController.create);

// get by id
router.get('/comment/:id',authentification,commentController.getById);


module.exports=router;