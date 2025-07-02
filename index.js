import express from "express";
import dotenv from "dotenv";
import connectDb from "./src/config/db.js";
import allRoutes from "./src/routes/index.js";

dotenv.config();
const port=process.env.PORT

const app=express();

app.use(express.json());

app.use('/api',allRoutes);

app.listen(port,()=>{
    console.log("Server is Runnig on port:",port);
    connectDb();
})