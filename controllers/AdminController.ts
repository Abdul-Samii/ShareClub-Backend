import { Request,Response,NextFunction } from "express";
import { DonorDto, NeedyDto } from "../dto";
import { Donor, DonorRequest, Needy, NeedyRequest } from "../models";



//Approve Needy
export const ApproveNeedy = async(req:Request,res:Response,next:NextFunction)=>{
    const needyId = req.body.needyId;
    // try{
        await NeedyRequest.findByIdAndUpdate({_id:needyId},{
            $set:{
                isApprove:true
            }
        });
        //adding into Needy document
        const needy =await NeedyRequest.findById({_id:needyId}).lean(true)
        // const {name,email,password,pic,phone,city,country,address,acceptedAds,
        //     currentAds,role,isApprove} = needy
        // const yo = await Needy.create(needy);
        console.log(needy)
        // const needy =await NeedyRequest.findByIdAndDelete({_id:needyId})

    // }
    // catch(err)
    // {
    //     return res.status(400).json("Something went wrong!");
    // }
    return res.status(200).json("Needy Approved!")
}