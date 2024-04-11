import express from "express";
import bodyParser from "body-parser"
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import mongoose from "mongoose";
import { RegRouter } from "./routes/register.js";
import { LoginRouter } from "./routes/login.js";
import { authorization } from "./config.js/authorization.js";
import { ProductRouter } from "./routes/product.js";
import { CartRouter } from "./routes/Cart.js";


dotenv.config();


const PORT=process.env.PORT || 4000;
const app=express();
// app.use(express.urlencoded({extended:false}));
// const corsOptions = {
//     origin: 'https://localhost:3000', // Update this with your frontend's origin
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//   };
  
// app.use(cors(corsOptions));
app.use(cors());
const server=createServer(app);

app.use(express.json({limit:'50mb'}));
// app.use(express.urlencoded());
// app.use(bodyParser.json())

app.use("/register",RegRouter);
app.use("/login",LoginRouter);
app.use("/user/products",ProductRouter);
app.use("/cart",CartRouter);

app.get("/home",authorization,(req,res)=>{
    console.log("I am Authorized");
    console.log(req.user);
    res.json("I am Authorized ");
})


server.listen(PORT,()=>{
    console.log("Server running on PORT : "+PORT);
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("Connected to MongoDB Database");
    }).catch((error)=>{
        console.log(error.message);
    })
})
