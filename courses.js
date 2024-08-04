import Courses from './coursemodel.js';
import Cart from './cartmodel.js';
import Review from './reviewmodel.js';

const addCourse = async (req, res) => {
    const { image, title, description, rating, price, author } = req.body;
    const newCourse = await new Courses({ image: image, title: title, description: description, rating: Number(rating), price: Number(price), author: author });
    newCourse.save();
}

const getCourses = async (req, res) => {
    const all_courses = await Courses.find();
    return res.status(200).json({ courses: all_courses });
}

const courseMap = {
    "database": "dbms",
    "object": "oops",
    "web": "web development",
    "python": "python programming",
    "ml": "machine learning",
    "js": "javascript",
    "ai": "artificial intelligence",
    "os" : "operating system",
    "cn" : "computer network",
    "computer networks" : "computer network",
}


const getCourseAbbreviation = (course) => {
    if(course == "c++" || course == "C++"){
        return "cpp";
    }
    course = course.toLowerCase();
    for (const [keyword, abbreviation] of Object.entries(courseMap)) {
        const regex = new RegExp(`^${keyword}`, "i");
        if (regex.test(course)) {
            return abbreviation;
        }
    }
    return course;
}

const getCoursesBySearch = async (req, res) => {
    const searchQuery = req.body.searchQuery.toLowerCase();
    if (searchQuery === "") {
        const all_courses = await Courses.find();
        return res.status(200).json({ courses: all_courses });
    }

    else if(searchQuery == "c++" || searchQuery == "C++"){
        const all_courses = await Courses.find({title : {$regex : "cpp" , $options : 'i'}});
        return res.status(200).json({ courses: all_courses });
    }
    else{
        const abbreviation = getCourseAbbreviation(searchQuery);
        const search_regex = { $regex: searchQuery, $options: 'i' };
    
        const all_courses = await Courses.find({
            $or: [
                { title: { $regex: abbreviation, $options: 'i' } },
                { title: search_regex }
            ]
        });
    
        return res.status(200).json({ courses: all_courses });
    }

}


const getCoursesByRating = async (req, res) => {
    let { searchQuery, searchRating } = req.body;
    if (searchRating == "Rating" && searchQuery != "") {
        const abbreviation = getCourseAbbreviation(searchQuery);
        const all_courses = await Courses.find({ title: abbreviation });
        return res.status(200).json({ courses: all_courses });
    }
    else if (searchRating == "Rating" && searchQuery == "") {
        const abbreviation = getCourseAbbreviation(searchQuery);
        const all_courses = await Courses.find();
        return res.status(200).json({ courses: all_courses });
    }
    searchRating = Number(searchRating.substring(0, 1));
    if (searchQuery === "") {
        const all_courses = await Courses.find({ rating: { $gte: searchRating } });
        return res.status(200).json({ courses: all_courses });
    }
    const abbreviation = getCourseAbbreviation(searchQuery);
    const all_courses = await Courses.find({ title: abbreviation, rating: { $gte: searchRating } });
    return res.status(200).json({ courses: all_courses });
}

const getCourseDetails = async (req, res) => {
    const course_id = req.body.course_id;
    const course = await Courses.find({ _id: course_id });
    return res.status(200).json({ course_detail: course });
}

const addToCart = async (req, res) => {
    const course_id = req.body.course_id;
    const user_email = req.rootUser[0].email;
    console.log(user_email);
    console.log(course_id);
    const newCartItem = new Cart({ user_email: user_email, course_id: course_id });
    newCartItem.save();

    return res.status(200).json({ cart_message: "Course added successfully" });
}

const addReview = async (req, res) => {
    const user_name = req.rootUser[0].name;
    const { course_id, review } = req.body;
    const newReview = new Review({ user_name: user_name, course_id: course_id, review: review });
    newReview.save();
    return res.status(200).json({ message: "Review added successfully" });
}

const getReviewForCourse = async (req, res) => {
    const course_id = req.body.c_id;
    const all_reviews = await Review.find({ course_id: course_id });
    return res.status(200).json({ all_reviews: all_reviews });
}

export { addCourse, getCourses, getCoursesBySearch, getCoursesByRating, addToCart, getCourseDetails, addReview, getReviewForCourse };