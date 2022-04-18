import mongoose,{Schema,Document,Model} from "mongoose";

interface NeedyDoc extends Document{
    name:string;
    email:string;
    pic:string;
    phone:string;
    city:string;
    country:string;
    address:string;
    fbID:string;
    signupType:number;
    state:string;
    acceptedAds:any;
    currentAds:any;
    rejectedAds:any;
    role:string;
    privateMode:boolean;
    allowMessages:boolean;
    isApprove:boolean;
}


const NeedySchema =  new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    fbID:{
        type:String,
        required:true
    },
    signupType:{
        type:Number,
        default:2,
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
    state:{
        type:String,
        default:"-"
    },
    acceptedAds:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'donationad'
    }],
    currentAds:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'donationad'
    }],
    rejectedAds:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'donationad'
    }],
    role:{
        type:String,
        default:"needy"
    },
    privateMode:{
        type:Boolean,
        default:true
    },
    allowMessages:{
        type:Boolean,
        default:true
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

const NeedyFB = mongoose.model<NeedyDoc>('needyfb',NeedySchema)
export {NeedyFB}

