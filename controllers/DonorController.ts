import { Request,Response,NextFunction } from "express";
import { adDto } from "../dto";
import { DonationAd, Needy } from "../models";


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
    return res.status(200).json(NewDonationAd)

    }
    catch(err)
    {
        return res.status(400).json("Something went wrong!");
    }
    
}