import Cart from "./cartmodel.js";
import Courses from './coursemodel.js';

const showCartItems = async (req,res) => {
    const user_email = req.rootUser[0].email;
    const courseIdArray = await Cart.find({user_email : user_email}).select('course_id');
    const coursesArray = [];
    for(let i=0;i<courseIdArray.length;i++){
        const courseObj = await Courses.find({_id : courseIdArray[i].course_id.toString()});
        coursesArray.push(courseObj);
    }
    const newCourseArray = [];
    for(let i=0;i<coursesArray.length;i++){
        for(let j=0;j<coursesArray[i].length;j++){
            newCourseArray.push(coursesArray[i][j]);
        }
    }
    res.status(200).json({course_array : newCourseArray});
}

const removeFromCart = async (req,res) => {
    const courseId = req.body.course_id;
    const user_email = req.rootUser[0].email;
    console.log(courseId);
    console.log(user_email);
    await Cart.deleteOne({user_email:user_email , course_id : courseId});
    console.log("Course deleted successfully");
    const courseIdArray = await Cart.find({user_email : user_email}).select('course_id');
    const coursesArray = [];
    for(let i=0;i<courseIdArray.length;i++){
        const courseObj = await Courses.find({_id : courseIdArray[i].course_id.toString()});
        coursesArray.push(courseObj);
    }
    const newCourseArray = [];
    for(let i=0;i<coursesArray.length;i++){
        for(let j=0;j<coursesArray[i].length;j++){
            newCourseArray.push(coursesArray[i][j]);
        }
    }
    res.status(200).json({course_array : newCourseArray});
}

const getNoOfItems = async(req,res) => {
    const user_email = req.rootUser[0].email;
    const courseIdArray = await Cart.find({user_email : user_email}).select('course_id');
    return res.status(200).json({no_of_items : courseIdArray.length});
}

export {showCartItems , removeFromCart , getNoOfItems};