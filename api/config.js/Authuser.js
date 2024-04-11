import jwt from "jsonwebtoken";

export function genToken(userid){
    const token=jwt.sign({userid},process.env.JWT_SECRET,{
        expiresIn:"30d",
    });
    return token;
}