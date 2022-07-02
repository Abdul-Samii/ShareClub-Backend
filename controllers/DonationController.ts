import { Request,Response,NextFunction } from "express";
import { Needy,Donor,Admin, DonationAd } from "../models";
import { GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } from "../utility";



//GET DONATIONS FOR MESSAGE
export const GetDonationsForMessage = async(req:Request,res:Response,next:NextFunction) =>{
    const type = req.body.type;
    const userId = req.body.userId;
    var donations;
console.log(req.params)
    try{
    if(type === 'needy')
    {
        donations = await DonationAd.find({needy:userId}).populate({path:'owner'});
    }
    else if(type === 'donor')
    {
        donations = await DonationAd.find({owner:userId,needy:{$exists:true}}).populate({path:'needy'})
    }
    
console.log(donations)
    const temp = JSON.stringify(donations)
    const donationsDetail = JSON.parse(temp)

    return res.status(200).json(donationsDetail);
        
}
catch(err)
{
    return res.status(403).json({"msg":"Something went wrong!"})
}

}