import mongoose,{Schema,Document,Model} from "mongoose";

interface adDoc extends Document{
    name:string;
}


const CategorySchema =  new Schema({
    name:{
        type:String,
        required:true
    },
    
},
    {
        timestamps:true
    }
);

const Category = mongoose.model<adDoc>('category',CategorySchema)
export {Category}

