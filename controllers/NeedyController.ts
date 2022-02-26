import {Request,Response,NextFunction} from 'express';
import { DonationAd, Donor, Needy } from '../models';



//Book Donation
export const BookDonationAd = async(req:Request,res:Response,next:NextFunction)=>{
    const donationAdId = req.body.donationAdId;
    const needyId = req.body.needyId;
    const availible = await DonationAd.findById({_id:donationAdId})
    try{
        if(availible)
        {

            const temp = JSON.stringify(availible);
            const temp2 = JSON.parse(temp)
            const isAvailible = temp2.isAvailible;
            if(isAvailible)
            {
                await DonationAd.findByIdAndUpdate({_id:donationAdId},{
                    $set:{
                        needy:needyId,
                        isAvailible:false
                    }
                })
            }
            else{
                return res.status(400).json("Donation Ad is Booked by other user")
            }
        }
        else{
            return res.status(404).json("No Donation Ad Found");
        }
}
    catch(err)
    {
        return res.status(400).json("Something went wrong");
    }
    return res.status(200).json("Donation Booked!");
}


//View Nearby Donor
export const ViewNearbyDonors=async(req:Request,res:Response,next:NextFunction)=>{
    const userId = req.body.userId;
    try{
    const needyo = await Needy.findById({_id:userId});
    const temp = JSON.stringify(needyo);
    const temp2 = JSON.parse(temp);
    const needyCity = temp2.city;
    if(needyCity === '-')
    {
        return res.status(400).json("Add your city to search")
    }
    const donors = await Donor.find({city:needyCity}) 
        if(donors[0] == null)
        {
            return res.status(404).json("No Donor availible in your region")
        }
    return res.status(200).json(donors)
    }
    catch(err)
    {
        return res.status(400).json("Something went wrong!");
    }
}