import mongoose from "mongoose";

const ProductSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    id:{
        type:Number,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    discountPercentage:{
        type:Number,
    },
    category:{
        type:String,
        required:true,
    },
    stock:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
    },
    images:[{
        type:String,
        required:true,
    }],
},{
    timestamps:true,
});

export const Product=mongoose.model("Product",ProductSchema);