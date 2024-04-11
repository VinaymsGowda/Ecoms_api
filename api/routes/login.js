import express from 'express'
import { UserModel } from '../models/User.js';
import bcrypt from "bcrypt"
import { genToken } from '../config.js/Authuser.js';

export const LoginRouter=express.Router();
const salt=bcrypt.genSaltSync(10);

LoginRouter.post("/",async(req,res)=>{
    try {
        const {username,password}=req.body;
        // let regex = new RegExp('[a-z0-9]+@gmail+\.com');
        // const isEmail=regex.test(username);

        // const query=isEmail?{"email":username}:{username};


        const CheckUser=await UserModel.findOne({
            $or:[
                {username:username},
                {email:username},
            ]
        });

        if(CheckUser){
            const passok=bcrypt.compareSync(password,CheckUser.password);
            if(passok){
                //generate a token with userid after login
                return res.status(200).json({message:"Successful Login",
                userid:CheckUser._id,
                profile:CheckUser.profile,
                username:CheckUser.username,
                email:CheckUser.email,
                token:genToken(CheckUser._id),
                });
            }
            else{
                return res.status(400).json("Wrong Password");
            }
        }
        else{
            return res.status(400).json("Wrong Username or Email");
        }
    } catch (error) {
        console.log(error.message);
    }
})