import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register=async(req,res)=>{
    try{
       const {email,password}=req.body;
       if(!email || !password){
         return res.status(400).json({Success:false,message:"Email and Password required"});
       }
       const user=await userModel.findOne({email:email.toLowerCase()});
       if(user){
        return res.status(409).json({Success:true,message:"User Already Exist"});
       }
       const hashedPassword=await bcrypt.hash(password,10);
       const newUser=await userModel.create({email,password:hashedPassword});
       res.status(201).json({Success:true,message:"Successfully Registered",newUser});
    }catch(err){
        console.log("Error while registering",err.message);
        res.status(500).json({Success:false,message:"Internal Server Error"});
    }
}

export const login=async(req,res)=>{
   try{
     const {email,password}=req.body;
     if(!email || !password){
      return res.status(400).json({Success:false,message:"Email and Password required"});
     }
     const user=await userModel.findOne({email:email.toLowerCase()});
     if(!user){
      return res.status(404).json({Success:false,message:"user not exist"});
     }
     const isMatch=await bcrypt.compare(password,user.password);
     if(!isMatch){
      return res.status(401).json({Success:false,message:"Invalid credentail"});
     }
     const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
     res.status(200).json({Success:true,message:"Login Successfull",token});
   }catch(err){
        console.log("Error while registering",err.message);
        res.status(500).json({Success:false,message:"Internal Server Error"});
  }
}