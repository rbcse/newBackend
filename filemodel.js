import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    subject : {
        type : String,
        required : true
    },
    pdf : {
        type : String,
        required : true
    }
});

const Files = new mongoose.model("files",fileSchema);
export default Files;