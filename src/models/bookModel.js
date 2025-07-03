import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const bookSchema=new mongoose.Schema(
    {
        id:{
            type:String,
            default:uuidv4,
            unique:true
        },
        title:{
            type:String,
            required:true
        },
        author:{
            type:String,
            required:true
        },
        genre:{
            type:String,
            required:true
        },
        publishedYear:{
            type:Number,
            required:true
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User"
        }
    }
)

export default mongoose.model("Book",bookSchema);