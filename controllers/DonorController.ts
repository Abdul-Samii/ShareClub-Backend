import { Request,Response,NextFunction } from "express";
import { adDto } from "../dto";
import { DonationAd, Donor, DonorFB } from "../models";


//Add Donation Ad
export const AddDonationAd = async (req:Request,res:Response,next:NextFunction) =>{
    const {title,description,owner,needy,isAvailible,images,phone,city,country,address,category} = <adDto>req.body

    try{
    const NewDonationAd = await DonationAd.create({
        title:title,
        description:description,
        images:images,
        phone:phone,
        city:city,
        country:country,
        address:address,
        owner:owner,
        needy:needy,
        category:category,
        isAvailible:isAvailible
    })
    console.log(NewDonationAd._id)
    await Donor.findByIdAndUpdate({_id:owner},{
        $push:{
            activeAds:NewDonationAd._id
        }
    });
    return res.status(200).json({"msg":"Successfully Added New Donation!"})

    }
    catch(err)
    {
        return res.status(400).json("Something went wrong!");
    }   
}


//Get Donor details
export const GetDonor = async(req:Request,res:Response,next:NextFunction)=>{
    const donorId = req.body.donorId;
    const signupType = req.body.signupType;

    console.log(donorId)
    var donor;
    try{
        if(signupType == 1)
        {
              donor = await Donor.findById({_id:donorId});
        }
        else if(signupType == 2){
             donor = await DonorFB.findById({_id:donorId});
        }
        console.log(donor)
        return res.status(200).json(donor);
    }
    catch(err)
    {
        return res.status(400).json("Something went wrong!")
    }
}


//View Booked donations
export const ViewDonorBookedDonations=async(req:Request,res:Response,next:NextFunction)=>{
    const userId = req.query.userId;
    console.log("Checkeding -> ",userId);
    try{
    const donoryo = await Donor.findById({_id:userId}).populate({
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
    const temp = JSON.stringify(donoryo);
    const bookedAds = JSON.parse(temp);
    if( bookedAds==null)
    {
        return res.status(200).json({"msg":"No donation Ad found"})
    }
        console.log(bookedAds)
    return res.status(200).json({donations:bookedAds,msg:"showing booked ads"})
    }
    catch(err)
    {
        return res.status(403).json({"msg":"Something went wrong!"});
    }
}