import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { readJson } from "../utils/filehelper.js";

export const authMiddleware=async(req,res,next)=>{
    try{
       const token=req.headers.authorization?.split(" ")[1];
       if(!token){
        return res.status(401).json({Success:false,message:"Access denied! No token provided"});
       }
       const decode=jwt.verify(token,process.env.JWT_SECRET);
       const users=await readJson("users.json");
       const user=await users.find(u=>u.id===decode.userId);   
       if (!user) {
         return res.status(401).json({ Success: false, message: "Invalid user" });
       }
       req.user=user;
       next();
    }catch(err){
        console.log("Erro",err.message);
        res.status(500).json({Success:false,message:"Authentication failed"});
    }
}