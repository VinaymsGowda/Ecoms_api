import { Product } from "../models/Products.js";
import cloudinary from "../config.js/cloudinary.js";



async function fetchProducts(req,res){
    const products=await Product.find({});
    res.json(products);
}

async function fetchProductById(req,res){
    const {id}=req.params;
    console.log(req.query);
    const product=await Product.findById(id);
    res.json(product);
}

async function nameSearch(req,res){
    try {
    console.log("swagger");
    const name=req.query.name;
    console.log(req.query.name);
    
    if(!name){
        return res.status(402).json("No data");
    }

    const product=await Product.find(

        {$or:[
            {title:new RegExp(name, 'i') },
            {description:new RegExp(name,'i')},
            {category:new RegExp(name,'i')}
        ]}
        );
    if(product)
        return res.json(product)
    else
        return res.status(402).json("No data");
    } catch (error) {
        console.log("Error Occured");
    }   
    }

async function addProduct(req,res){
    const {data}=req.body;
    const {title,description,price,discountPercentage,category,stock,rating}=data;
    const {images}=req.body;
    
    
    try {

        const uploadResponse=await cloudinary.v2.uploader.
        upload(images,{
            upload_preset:'products'
        });
        const newProduct=await Product.create({
            title,
            description,
            price,
            discountPercentage,
            stock,
            category,
            rating,
            images:uploadResponse.url
        });
        console.log(newProduct);
        res.json(newProduct)
    } catch (error) {
        console.log(error.message);
    }
}

export {fetchProducts,fetchProductById,nameSearch,addProduct};