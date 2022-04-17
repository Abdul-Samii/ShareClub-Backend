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