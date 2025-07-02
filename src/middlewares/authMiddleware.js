import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const authMiddleware=async(req,res,next)=>{
    try{
       const token=req.headers.authorization?.split(" ")[1];
       if(!token){
        return res.status(401).json({Success:false,message:"Access denied! No token provided"});
       }
       const decode=jwt.decode(token,process.env.SECRET_KEY);
       const user=await userModel.findById(decode.userId).select("-password");
       req.user=user;
       next();
    }catch(err){
        console.log("Erro",err.message);
        res.status(500).json({Success:false,message:"Internal Server Error"});
    }
}