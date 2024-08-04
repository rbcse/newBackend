import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    subject : {
        type : String,
        required : true
    },
    subject_id : {
        type : Number,
        required : true
    },
    level : {
        type : String,
        required : true
    },
    question_text : {
        type : String,
        required :  true
    },
    option1 : {
        type: String,
        required : true
    } ,
    option2 : {
        type: String,
        required : true
    } ,
    option3 : {
        type: String,
        required : true
    } ,
    option4 : {
        type: String,
        required : true
    } ,
    answer : {
        type : String,
        required : true
    }
});

const Quiz = new mongoose.model("quizsubjects",quizSchema);
export default Quiz;