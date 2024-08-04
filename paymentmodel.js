import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    payment_id:{
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true
    },
    course_id:[{type:String}]
});

const Payments = new mongoose.model("payments",paymentSchema);
export default Payments;