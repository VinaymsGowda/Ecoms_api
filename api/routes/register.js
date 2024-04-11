import express from "express";
import cloudinary from "cloudinary";
import { UserModel } from "../models/User.js";
import bcrypt from "bcrypt";

export const RegRouter = express.Router();

const salt = bcrypt.genSaltSync(10);
RegRouter.post("/", async (req, res) => {
    const { username, password, email, phoneNumber, isAdmin,profile } = req.body;
    
    // console.log(req.body);

    if (!username || !password || !email) {
        return res.status(400).json({ "message": "Incomplete data. Enter all details." });
    }

    if (phoneNumber.length !== 10) {
        return res.status(400).json({ "message": "Mobile number should be 10 digits." });
    }

    try {
        const CheckUser = await UserModel.findOne({
            $or: [{ username }, { email }]
        });
        if (CheckUser) {
            return res.status(400).json({ "message": "Username or Email already exists. Try another." });
        }

        let profileUrl;
        if (profile) {
            const response = await cloudinary.v2.uploader.upload(profile, {
                upload_preset: 'users',
            });
            profileUrl = response.secure_url; // Assuming Cloudinary provides secure_url
        }

        const HashedPassword = bcrypt.hashSync(password, salt);

        const newUser = await UserModel.create({
            username,
            password: HashedPassword,
            email,
            profile: profileUrl,
            isAdmin,
            phoneNumber
        });
        return res.status(200).json({ "message": "Account Created Successfully", newUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Internal server error." });
    }
});
