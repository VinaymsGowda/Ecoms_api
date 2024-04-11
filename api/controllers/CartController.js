import { CartModel } from "../models/Cart.js";

export async function ManageCart(req,res){
    const userId=req.user._id;

    const {productId,quantity}=req.body;

    

    try {

        //first check if product already exists in cart of that user

        const checkItems=await CartModel.findOne({
            $and:[
                {products:productId},
                {userId:userId},
            ]
        });

        if(checkItems && quantity===0){  //remove from cart 
            const delItem=await CartModel.deleteOne({
                $and:[
                    {products:productId},
                    {userId},
                ]
            });

            return res.json(delItem);
        }

        //if found make a update req on that cart and send back response
        if(checkItems){
            const updateCart=await CartModel.updateOne({
                $and:[
                    {products:productId},
                    {userId:userId},
                ]
            },{
                quantity:quantity
            });
            return res.status(201).json(updateCart);
        }
        
        //add new Cart
        const newItem=await CartModel.create({
            products:productId,
            userId,
            quantity,
        })
        return res.json(newItem);

    } catch (error) {
        console.log(error.message);
    }

   

    

}

export async function getAllProducts(req,res){
    const userId=req.user._id;

    try {
        const GetProducts=await CartModel.find({userId:userId})
        if(GetProducts){
            console.log(GetProducts);
            return res.json(GetProducts);
        }
    } catch (error) {
        console.log(error.message);
    }
}