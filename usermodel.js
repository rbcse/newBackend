import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
});

userSchema.methods.generateToken = async function(){
    try{
        return jwt.sign({
            userId : this._id.toString(),
            email : this.email,
            name : this.name
        } , "TOP SECRET",{
            expiresIn : "30d"
        })
    }
    catch(err){
        console.log(err);
    }
}
const User = new mongoose.model("User",userSchema);
export default User;