// import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import { readJson,writeJson } from "../utils/filehelper.js";

const USER_FILE="users.json"

export const register=async(req,res)=>{
    try{
       const {email,password}=req.body;
       if(!email || !password){
         return res.status(400).json({Success:false,message:"Email and Password required"});
       }
       const users=await readJson(USER_FILE);
       if(users.find(u=>u.email===email.toLowerCase())){
         return res.status(409).json({ Success: false, message: "User already exists" });
       }
       const hashedPassword=await bcrypt.hash(password,10);
       const newUser={id:uuidv4(),email:email.toLowerCase(),password:hashedPassword};
       users.push(newUser);
       await writeJson(USER_FILE,users);
       res.status(201).json({Success:true,message:"Successfully Registered",user:newUser});
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
     const users=await readJson(USER_FILE);
     const user=users.find(u=>u.email===email.toLowerCase());
     if(!user){
      return res.status(404).json({Success:false,message:"user not found"});
     }
     const isMatch=await bcrypt.compare(password,user.password);
     if(!isMatch){
      return res.status(401).json({Success:false,message:"Invalid credentail"});
     }
     const token=jwt.sign({userId:user.id},process.env.JWT_SECRET,{expiresIn:"1h"});
     res.status(200).json({Success:true,message:"Login Successfull",token});
   }catch(err){
        console.log("Error",err.message);
        res.status(500).json({Success:false,message:"Internal Server Error"});
  }
}