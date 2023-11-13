class DTO{
    constructor(user){
        this.username=user.username;
        this._id=user.id;
        this.password=user.password;
        this.email=user.email;
    }
}

module.exports=DTO;