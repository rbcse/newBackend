import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user_email : {
        type : String,
        required : true
    },
    course_id : {
        type : String,
        required : true
    }
});

const Cart = new mongoose.model("cart",cartSchema);
export default Cart;