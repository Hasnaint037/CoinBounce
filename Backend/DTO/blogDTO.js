class Blog{
    // for specefic details of blog
    constructor(blog){
        this.title=blog.title;
        this.content=blog.content;
        this.author=blog.author;
        this.photo=blog.photoPath;
        this.id=blog._id;
    }
}
module.exports=Blog;