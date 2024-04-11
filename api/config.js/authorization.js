import jwt from "jsonwebtoken"
import { UserModel } from "../models/User.js";

export async function authorization(req,res,next){
    if(!req.headers.authorization){
        throw Error("Not Authorized");
    }

    try {
        const header=req.headers.authorization;
        // console.log(header);
        const token=header.split("Bearer ")[1];
        // console.log(token);
    // res.json(token);
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        req.user=await UserModel.findOne({_id:decoded.userid},{password:0})
        next();
    } catch (error) {
        res.status(401).json("Authorization Failed")
        console.log(error.message);
    }
}

export async function Admin(req,res,next){
    try {
        const admin=await UserModel.findById(req.user._id);
        if(admin){
            if(admin.isAdmin){
                next();
            }
            else{
                res.status(404).json("U are Not a Admin");
            }
        }
        else{
            res.status(404).json("U are Not Authorized");
        }
    } catch (error) {
        console.log(error);
    }
}