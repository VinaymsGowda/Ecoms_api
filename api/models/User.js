import mongoose from "mongoose";

const UserSchema=mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    profile:{
        type:String,
        default:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
},{
    timestamps:true,
});

export const UserModel=mongoose.model("User",UserSchema);