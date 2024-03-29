import {Request,Response,NextFunction} from 'express';
import { DonationAd, Donor, Needy, NeedyFB } from '../models';


//Get Needy details
export const GetNeedy = async(req:Request,res:Response,next:NextFunction)=>{
    const needyId = req.body.needyId;
    const signupType = req.body.signupType;
    console.log(needyId)
    try{
        var needy;
        if(signupType == 1)
        {
             needy = await Needy.findById({_id:needyId});
        }
        else if(signupType == 2){
             needy = await NeedyFB.findById({_id:needyId});
        }
        return res.status(200).json(needy);
    }
    catch(err)
    {
        return res.status(400).json("Something went wrong!")
    }
}



//Book Donation
export const BookDonationAd = async(req:Request,res:Response,next:NextFunction)=>{
    const donationAdId = req.body.donationAdId;
    const needyId = req.body.userId;
    console.log("Book ",donationAdId,needyId)
    const availible = await DonationAd.findById({_id:donationAdId})
    try{
        if(availible)
        {

            const temp = JSON.stringify(availible);
            const temp2 = JSON.parse(temp)
            const owner = temp2.owner
            const isAvailible = temp2.isAvailible;
            if(isAvailible)
            {
                await DonationAd.findByIdAndUpdate({_id:donationAdId},{
                    $set:{
                        needy:needyId,
                        isAvailible:false
                    }
                });
                await Needy.findByIdAndUpdate({_id:needyId},{
                    $push:{
                        bookedAds:donationAdId
                    },
                    $pull:{
                        rejectedAds:donationAdId
                    }
                });
                await Donor.findByIdAndUpdate({_id:owner},{
                    $push:{
                        bookedAds:donationAdId
                    },
                    $pull:{
                        activeAds:donationAdId
                    }
                });
            }
            else{
                return res.status(200).json({"msg":"Donation Ad is Booked by other user"})
            }
        }
        else{
            return res.status(200).json({"msg":"No Donation Ad Found"});
        }
}
    catch(err)
    {
        return res.status(200).json({"msg":"Something went wrong"});
    }
    return res.status(200).json({"msg":"Donation Booked!"});
}



//Cancel DonationAd
export const CancelDonationAd = async(req:Request,res:Response,next:NextFunction)=>{
    const donationAdId = req.body.donationAdId;
    const needyId = req.body.userId;
    console.log("Book ",donationAdId,needyId)
    const availible = await DonationAd.findById({_id:donationAdId})
    try{
        if(availible)
        {

            const temp = JSON.stringify(availible);
            const temp2 = JSON.parse(temp)
            const isAvailible = temp2.isAvailible;
            const owner = temp2.owner;
            if(!isAvailible)
            {
                await DonationAd.findByIdAndUpdate({_id:donationAdId},{
                    $set:{
                        isAvailible:true
                    },
                    $unset:{
                        needy:""
                    }
                });
                await Needy.findByIdAndUpdate({_id:needyId},{
                    $pull:{
                        bookedAds:donationAdId
                    },
                    $push:{
                        rejectedAds:donationAdId
                    }
                });
                await Donor.findByIdAndUpdate({_id:owner},{
                    $push:{
                        activeAds:donationAdId
                    },
                    $pull:{
                        bookedAds:donationAdId
                    }
                });
            }
            else{
                return res.status(200).json({"msg":"Donation Ad is not booked"})
            }
        }
        else{
            return res.status(200).json({"msg":"No Donation Ad Found"});
        }
}
    catch(err)
    {
        return res.status(200).json({"msg":"Something went wrong"});
    }
    return res.status(200).json({"msg":"Donation Cancelled!"});
}

//Complete Donation
export const CompleteDonationAd = async(req:Request,res:Response,next:NextFunction)=>{
    const donationAdId = req.body.donationAdId;
    console.log("uuu",donationAdId)
    const needyId = req.body.userId;
    const availible = await DonationAd.findById({_id:donationAdId})
    try{
        if(availible)
        {

            const temp = JSON.stringify(availible);
            const temp2 = JSON.parse(temp)
            const owner = temp2.owner
            
                
                await Needy.findByIdAndUpdate({_id:needyId},{
                    $push:{
                        completedAds:donationAdId
                    },
                    $pull:{
                        bookedAds:donationAdId
                    }
                });
                await Donor.findByIdAndUpdate({_id:owner},{
                    $push:{
                        completedAds:donationAdId
                    },
                    $pull:{
                        bookedAds:donationAdId
                    }
                });
        }
        else{
            return res.status(200).json({"msg":"No Donation Ad Found"});
        }
}
    catch(err)
    {
        return res.status(200).json({"msg":"Something went wrong"});
    }
    return res.status(200).json({"msg":"Donation Completed!"});
}


//View Nearby DonationAds
export const ViewNearbyDonations=async(req:Request,res:Response,next:NextFunction)=>{
    const userId = req.query.userId;
    console.log("Checkeding -> ",userId);
    try{
    const needyo = await Needy.findById({_id:userId});
    const temp = JSON.stringify(needyo);
    const temp2 = JSON.parse(temp);
    const needyCity = temp2.city;
    if(needyCity === '-')
    {
        return res.status(200).json({"msg":"Add your city to search"})
    }
    const donations = await DonationAd.find({city:needyCity}).populate('category') 
        if(donations[0] == null)
        {
            return res.status(200).json({"msg":"No Donation ad available in your region"})
        }
    return res.status(200).json({donations:donations,msg:"showing nearby ads"})
    }
    catch(err)
    {
        return res.status(403).json({"msg":"Something went wrong!"});
    }
}



//View Booked donations
export const ViewBookedDonations=async(req:Request,res:Response,next:NextFunction)=>{
    const userId = req.query.userId;
    console.log("Checkeding -> ",userId);
    try{
    const needyo = await Needy.findById({_id:userId}).populate({
        path:'bookedAds',
        populate:{
            path:'category'
        }
    }).populate({
        path:'completedAds',
        populate:{
            path:'category'
        }
    })
    const temp = JSON.stringify(needyo);
    const bookedAds = JSON.parse(temp);
    if( bookedAds==null)
    {
        return res.status(200).json({"msg":"No donation Ad found"})
    }
        
    return res.status(200).json({donations:bookedAds,msg:"showing booked ads"})
    }
    catch(err)
    {
        return res.status(403).json({"msg":"Something went wrong!"});
    }
}