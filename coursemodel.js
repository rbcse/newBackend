import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    image : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    author : {
        type:String,
        required : true
    }
});

const Courses = new mongoose.model("courses",courseSchema);
export default Courses;