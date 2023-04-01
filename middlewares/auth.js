import { User } from "../models/user.js";
import jwt from "jsonwebtoken"

export const isAuthenticated = async (req, res, next ) => {
    const {token} = req.cookies;
    if(!token){
        return res.json({
            success: false,
            message: "Please Login First",
        });
    };
    const decodedData = jwt.verify(token, process.env.JWT_SECRET) ;
    req.user = await User.findById(decodedData._id);
    next();
};