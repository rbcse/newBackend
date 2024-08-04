import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    email : {
        type : String,
        required: true
    },
    quizSub : {
        type:String
    },
    score : {
        type : Number
    },
    total : {
        type : Number
    }
});

const Profile = new mongoose.model("profile",profileSchema);
export default Profile;