import mongoose, { mongo } from 'mongoose'
import { MONGO_URI } from '../config';


export default async()=>{
    try{
        mongoose.connect(MONGO_URI).then(result=>{
            console.log("Connected to Database!")
        }).catch(err=>console.log("Error : ",err))
    }
    catch(err)
    {
        console.log(err);
    }
}