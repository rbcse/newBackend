import Blogs from "./blogmodel.js";


const getTodayDate = () => {
    const today = new Date();
    const day = today.getDate().toString();
    const month = today.getMonth().toString();
    const year = today.getFullYear().toString();
    const todayDate = day + "-" + month + "-" + year;
    return todayDate;
}

getTodayDate();

const createBlog = async(req,res) => {
    const {title , para , author} = req.body;
    const user_email = req.rootUser[0].email;
    const todayDate = getTodayDate();

    const newBlog = await new Blogs({title : title , para : para , author
         : author , created_on : todayDate , user_email : user_email
    });

    newBlog.save();
    return res.status(200).json({message : "Blog added successfully"});
}

const getBlogs = async(req,res)=>{
    const all_blogs = await Blogs.find();
    return res.status(200).json({blog_arr : all_blogs});
}

const getMyBlogs = async(req,res) => {
    const user_email = req.rootUser[0].email;
    const all_blogs = await Blogs.find({user_email : user_email});
    return res.status(200).json({blog_arr : all_blogs});
}

const searchMap = {
    "ml" : "machine learning",
    "machine learning" : "machine learning",
    "dbms" : "database management system",
    "database" : "database management system" ,
    "oops" : "object oriented programming"
}

const getAbbreviation = (searchQuery) => {
    searchQuery = searchQuery.toLowerCase();
    for(const [keyword , abbreviation] of Object.entries(searchMap)){
        const regex = new RegExp(`\\b${keyword}\\b`,"i");
        if(regex.test(searchQuery)){
            return abbreviation;
        }
    }
    return searchQuery;
}

const getBlogsBySearch = async(req,res) => {
    const searchQuery = req.body.searchQuery;
    const abbreviation = getAbbreviation(searchQuery);
    const all_blogs = await Blogs.find({title : {$regex : `\\b${abbreviation}\\b`,$options:"i"}});
    return res.status(200).json({blog_arr : all_blogs});
}

const likeBlog = async(req,res) => {
    const blogId = req.body.id;
    const userEmail = req.rootUser[0].email;
    console.log(req.body);
    console.log("blog email",userEmail);
    try{
        const blog = await Blogs.findOne({_id : blogId});
        await blog.like_Blog(userEmail);
        const all_blogs = await Blogs.find();
        return res.status(200).json({blog_arr : all_blogs});
    }
    catch(err){
        console.log(err);
    }
}
const dislikeBlog = async(req,res) => {
    const blogId = req.body.id;
    const userEmail = req.rootUser[0].email;
    console.log(req.body);
    console.log("blog email",userEmail);
    try{
        const blog = await Blogs.findOne({_id : blogId});
        await blog.dislike_Blog(userEmail);
        const all_blogs = await Blogs.find();
        return res.status(200).json({blog_arr : all_blogs});
    }
    catch(err){
        console.log(err);
    }
}

export {createBlog , getBlogs , getMyBlogs , getBlogsBySearch , likeBlog , dislikeBlog};