import mongoose,{Schema,Document,Model} from "mongoose";

interface NeedyDoc extends Document{
    name:string;
    email:string;
    passowrd:string;
    salt:string;
    fbID:string;
    signupType:number;
    pic:string;
    phone:string;
    city:string;
    country:string;
    address:string;
    state:string;
    bookedAds:any;
    completedAds:any;
    role:string;
    isApprove:boolean;
    block:boolean;
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
    },
    salt:{
        type:String,
    },
    fbID:{
        type:String,
    },
    signupType:{
        type:Number,
        require:true
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
    block:{
        type:Boolean,
        default:false
    },
    completedAds:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'ad'
    }],
    bookedAds:[{
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

