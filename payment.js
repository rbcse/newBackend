const RAZORPAY_ID = 'rzp_test_3iOCKgVRiHQapy';
const RAZORPAY_SECRET_KEY = 'cK0mxg3shecsC2TQ4IbVGXr8';

import Razorpay from "razorpay";
import Payments from "./paymentmodel.js";

// Create an order id
const createOrder = async(req,res)=>{
    const razorpay = new Razorpay({
        key_id : RAZORPAY_ID,
        key_secret:RAZORPAY_SECRET_KEY
    });

    const options = {
        amount : req.body.amount,
        currency : "INR",
        receipt : "receipt#1",
        payment_capture : 1
    }

    console.log(options);

    try{
        const response = await razorpay.orders.create(options);
        const amount = response.amount * 100;
        return res.json({order_id : response.id , currency : response.currency , amount : amount});
    }
    catch(err){
        console.log(err);
    }
}

const makePayment = async(req,res) => {
    const {paymentId} = req.params;
    const razorpay = new Razorpay({
        key_id : RAZORPAY_ID,
        key_secret:RAZORPAY_SECRET_KEY
    });

    console.log("In makepayment",paymentId);

    try{
        const payment = await razorpay.payments.fetch(paymentId);
        if(!payment){
            return res.status(500).json("Error at loading razorpay");
        }

        return res.json({
            status : payment.status,
            method : payment.method,
            amount : payment.amount,
            currency : payment.currency
        })
    }
    catch(err){
        console.log(err);
    }
}

const savePaymentDetails = async(req,res)=>{
    const email = req.rootUser[0].email;
    const payment_id = req.body.payment_id;
    const course_ids = req.body.courseDetails;
    const newPayment = new Payments({email:email , payment_id:payment_id , course_id : course_ids});
    newPayment.save();
    console.log("Saved Successfully");
    return res.status(200).json({status:200});
}

export {createOrder,makePayment,savePaymentDetails};