import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    para: {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    created_on : {
        type : String,
        required :true
    },
    num_likes : {
        type : Number,
        default : 0
    },
    num_dislikes : {
        type: Number,
        default : 0
    },
    user_email : {
        type : String,
        required : true
    },
    liked_by : [{type : String}],
    disliked_by : [{type : String}]
});

blogSchema.methods.like_Blog = async function(userEmail){
    if(!this.liked_by.includes(userEmail) && !this.disliked_by.includes(userEmail)){
        this.liked_by.push(userEmail);
        this.num_likes++;
        await this.save();
    }
    else if(this.liked_by.includes(userEmail)){
        this.liked_by.pop(userEmail);
        this.num_likes--;
        await this.save();
    }
    else{
        this.disliked_by.pop(userEmail);
        this.num_dislikes--;
        this.num_likes++;
        this.liked_by.push(userEmail);
        await this.save();
    }
}
blogSchema.methods.dislike_Blog = async function(userEmail){
    if(!this.liked_by.includes(userEmail) && !this.disliked_by.includes(userEmail)){
        this.disliked_by.push(userEmail);
        this.num_dislikes++;
        await this.save();
    }
    else if(this.liked_by.includes(userEmail)){
        this.liked_by.pop(userEmail);
        this.num_likes--;
        this.num_dislikes++;
        this.disliked_by.push(userEmail);
        await this.save();
    }
    else{
        this.disliked_by.pop(userEmail);
        this.num_dislikes--;
        await this.save();
    }
}

const Blogs = new mongoose.model("blogs",blogSchema);
export default Blogs;