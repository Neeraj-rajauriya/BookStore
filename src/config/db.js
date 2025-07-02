import mongoose from "mongoose";

const connectDb=async()=>{
    try{
       const connect=await mongoose.connect(process.env.MONGO_URI);
       console.log("Db Connected");
    }catch(err){
        console.log("Error while ConnectingDb",err.message);
    }
}

export default connectDb;