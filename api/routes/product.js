import express from "express";
import { Admin, authorization } from "../config.js/authorization.js";
export const ProductRouter=express.Router();
import {  nameSearch, fetchProductById, fetchProducts, addProduct } from "../controllers/ProductController.js";

ProductRouter.get("/",fetchProducts)

ProductRouter.get("/name",nameSearch);

// add a product
// ProductRouter.post("/addProduct",authorization,Admin,addProduct);
ProductRouter.post("/addProduct",addProduct);

ProductRouter.get("/:id",fetchProductById);


// delete a product


