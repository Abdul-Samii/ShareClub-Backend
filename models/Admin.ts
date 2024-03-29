import mongoose,{Schema,Document,Model} from "mongoose";

interface AdminDoc extends Document{
    name:string;
    email:string;
    password:string;
    salt:any;
    pic:string;
    phone:string;
    city:string;
    country:string;
    address:string;
    state:string;
    role:string;
}


const AdminSchema =  new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    salt:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:"https://www.w3schools.com/howto/img_avatar.png"
    },
    phone:{
        type:String,
        default:"-"
    },
    city:{
        type:String,
        default:"-"
    },
    country:{
        type:String,
        default:"-"
    },
    state:{
        type:String,
        default:"-"
    },
    address:{
        type:String,
        default:"-"
    },
    role:{
        type:String,
        default:"admin"
    },
},
    {
        timestamps:true
    }
);

const Admin = mongoose.model<AdminDoc>('admin',AdminSchema)
export {Admin}

