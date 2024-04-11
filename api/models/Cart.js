import mongoose from "mongoose"

const CartSchema=mongoose.Schema({
    products:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
    },
    quantity:{
        type:Number,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
},{
    timestamps:true,
});

export const CartModel=mongoose.model('Cart Item',CartSchema);
