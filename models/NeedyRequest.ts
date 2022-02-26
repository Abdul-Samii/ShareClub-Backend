import mongoose,{Schema,Document,Model} from "mongoose";

interface NeedyDoc extends Document{
    name:string;
    email:string;
    passowrd:string;
    pic:string;
    phone:string;
    city:string;
    country:string;
    address:string;
    acceptedAds:any;
    currentAds:any;
    role:string;
    isApprove:boolean;
}


const NeedyRequestSchema =  new Schema({
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
    address:{
        type:String,
        default:"-"
    },
    acceptedAds:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'ad'
    }],
    currentAds:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'ad'
    }],
    role:{
        type:String,
        default:"needy"
    },
    isApprove:{
        type:Boolean,
        default:false
    },
},
    {
        timestamps:true
    }
);

const NeedyRequest = mongoose.model<NeedyDoc>('needyRequest',NeedyRequestSchema)
export {NeedyRequest}

