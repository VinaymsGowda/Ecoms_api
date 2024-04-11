import express from "express";
import { authorization } from "../config.js/authorization.js";
import { ManageCart, getAllProducts } from "../controllers/CartController.js";



export const CartRouter=express.Router();
CartRouter.post("/manage",authorization,ManageCart);

CartRouter.get("/getAll",authorization,getAllProducts);