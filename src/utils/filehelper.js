import {promises as fs} from "fs";
import path from "path";
import { json } from "stream/consumers";

const getPath=(file)=>path.join("data",file);

export const readJson=async(fileName)=>{
    const filePath=getPath(fileName);
    const exists=await fs.access(filePath).then(()=>true).catch(()=>false);
    if(!exists){
        await writeJson(fileName,[]);
    }
    const data=await fs.readFile(getPath(fileName),"utf-8");
    if(!data.trim()){
       return [];
    }
    return JSON.parse(data);
}

export const writeJson=async(fileName,data)=>{
    await fs.writeFile(getPath(fileName),JSON.stringify(data,null,2));
}