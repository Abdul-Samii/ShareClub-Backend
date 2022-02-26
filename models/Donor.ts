import mongoose,{Schema,Document,Model} from "mongoose";

interface DonorDoc extends Document{
    name:string;
    email:string;
    password:string;
    pic:string;
    phone:string;
    city:string;
    country:string;
    address:string;
    ads:any;
    activeAds:any;
    role:string;
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
    isApprove:{
        type:Boolean,
        default:false
    },
},
    {
        timestamps:true
    }
);

const Donor = mongoose.model<DonorDoc>('donor',DonorSchema)
export {Donor}

