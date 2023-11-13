class blogDetailsDTO{

    constructor(blog){
        this.title=blog.title;
        this.content=blog.content;
        this.photo=blog.photoPath;
        this.id=blog._id;
        this.author=blog.author._id;
        this.name=blog.author.username;
        this.createdAt=blog.createdAt;
    }
}
module.exports=blogDetailsDTO;