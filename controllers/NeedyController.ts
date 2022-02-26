import {Request,Response,NextFunction} from 'express';
import { DonationAd } from '../models';



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
                        owner:needyId,
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
}