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
    ads:any;
    activeAds:any;
    role:string;
    privateMode:boolean;
    allowMessages:boolean;
    isApprove:boolean;
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
    ads:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'ad'
    }],
    activeAds:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'ad'
    }],
    role:{
        type:String,
        default:"donor"
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

const DonorFB = mongoose.model<DonorDoc>('donorfb',DonorSchema)
export {DonorFB}

