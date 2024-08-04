import User from "./usermodel.js";
import jwt from "jsonwebtoken";
const Authenticate = async (req, res, next) => {
    try{
        const token = req.headers.authorization;
        if(!token){
            return res.status(200).json({message : "Unauthorized user"});
        }
        const verifyToken = jwt.verify(token,"TOP SECRET");
        const rootUser = await User.find({_id:verifyToken.userId});

        if (!rootUser) {
            throw new Error("User not found");
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;
        next();
    }
    catch(err){
        return res.status(401).send("Unauthorized user");
    }
};

export {Authenticate};

// console.log('Session:', req.session);
//     try {
//         const token = req.session.jwt; 
//         if (!token) {
//             throw new Error("No token provided");
//         }

//         const verifyToken = jwt.verify(token, "TOP SECRET");
//         const rootUser = await User.findOne({ _id: verifyToken.userId });

//         if (!rootUser) {
//             throw new Error("User not found");
//         }

//         req.token = token;
//         req.rootUser = rootUser;
//         req.userId = rootUser._id;
//         next();
//     } catch (err) {
//         res.status(401).send("Unauthorized user");
//         console.log(err);
//     }