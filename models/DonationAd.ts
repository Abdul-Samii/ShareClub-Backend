import mongoose,{Schema,Document,Model} from "mongoose";

interface adDoc extends Document{
    name:string;
    title:string;
    description:string;
    owner:any;
    needy:any;
    category:any;
    isAvailible:boolean;
    images:[string];
    city:string;
    country:string;
    phone:string;
    address:string;
}


const DonationAdSchema =  new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:"-"
    },
    images:[{
        type:String,
    }],
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
    owner:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'donor',
    },
    needy:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'needy',
    },
    category:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'category'
    }],
    isAvailible:{
        type:Boolean,
        default:true
    }
},
    {
        timestamps:true
    }
);

const DonationAd = mongoose.model<adDoc>('donationad',DonationAdSchema)
export {DonationAd}

