import mongoose,{Schema,Document,Model} from "mongoose";

interface DonorDoc extends Document{
    name:string;
    email:string;
    fbID:string;
    pic:string;
    phone:string;
    city:string;
    country:string;
    address:string;
    state:string;
    signupType:number;
    activeAds:any;
    bookedAds:any;
    completedAds:any;
    role:string;
    privateMode:boolean;
    allowMessages:boolean;
    isApprove:boolean;
    block:boolean;
}


const DonorSchema =  new Schema({
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
    signupType:{
        type:Number,
        default:2,
    },
    activeAds:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'donationad'
    }],
    bookedAds:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'donationad'
    }],
    completedAds:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'donationad'
    }],
    role:{
        type:String,
        default:"donor"
    },
    privateMode:{
        type:Boolean,
        default:true
    },
    block:{
        type:Boolean,
        default:false
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

const DonorFB = mongoose.model<DonorDoc>('donorfb',DonorSchema)
export {DonorFB}

