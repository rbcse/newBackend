import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    course_id : {
        type:String,
        required:true
    },
    user_name : {
        type : String,
        required : true
    },
    review : {
        type : String,
        required : true
    }
});

const Review = new mongoose.model("review",reviewSchema);
export default Review;