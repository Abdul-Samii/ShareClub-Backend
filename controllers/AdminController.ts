import { Request,Response,NextFunction } from "express";
import { DonorDto, NeedyDto } from "../dto";
import { Donor, DonorRequest, Needy, NeedyRequest } from "../models";



//View Needy Requests
export const ViewNeedyRequests = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const NeedyRequests = await NeedyRequest.find();
        return res.status(200).json(NeedyRequests);
    }
    catch(err)
    {
        return res.status(200).json("Something went wrong!")
    }
}

//View Donor Requests
export const ViewDonorRequests = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const DonorRequests = await DonorRequest.find();
        return res.status(200).json(DonorRequests);
    }
    catch(err)
    {
        return res.status(200).json("Something went wrong!")
    }
}


//Approve Needy
export const ApproveNeedy = async(req:Request,res:Response,next:NextFunction)=>{
    const needyId = req.body.needyId;
    try{
        await NeedyRequest.findByIdAndUpdate({_id:needyId},{
            $set:{
                isApprove:true
            }
        });
        //adding into Needy document
        const needyData =await NeedyRequest.findById({_id:needyId})
        const temp = JSON.stringify(needyData)
        const data = JSON.parse(temp)
        const {name,email,password,pic,phone,salt,city,country,address,acceptedAds,
            currentAds,role,isApprove} = data;
        const newNeedy = await Needy.create({
            name:name,
            email:email,
            password:password,
            salt:salt,
            pic:pic,
            phone:phone,
            city:city,
            country:country,
            address:address,
            acceptedAds:acceptedAds,
            currentAds:currentAds,
            role:role,
            isApprove:isApprove
        });
        await NeedyRequest.findByIdAndDelete({_id:needyId})

    }
    catch(err)
    {
        return res.status(400).json("Something went wrong!");
    }
    return res.status(200).json("Needy Approved!")
}




//Approve Donor
export const ApproveDonor = async(req:Request,res:Response,next:NextFunction)=>{
    const donorId = req.body.donorId;
    try{
        await DonorRequest.findByIdAndUpdate({_id:donorId},{
            $set:{
                isApprove:true
            }
        });
        //adding into Donor document
        const donorData =await DonorRequest.findById({_id:donorId})
        const temp = JSON.stringify(donorData)
        const data = JSON.parse(temp)
        const {name,email,password,pic,salt,phone,city,country,address,ads,
            activeAds,role,isApprove} = data;
        const  newDonor = await Donor.create({
            name:name,
            email:email,
            password:password,
            salt:salt,
            pic:pic,
            phone:phone,
            city:city,
            country:country,
            address:address,
            ads:ads,
            activeAds:activeAds,
            role:role,
            isApprove:isApprove
        });
        await DonorRequest.findByIdAndDelete({_id:donorId})

    }
    catch(err)
    {
        return res.status(400).json("Something went wrong!");
    }
    return res.status(200).json("Donor Approved!")
}


//Reject Donor
export const RejectDonor = async(req:Request,res:Response,next:NextFunction)=>{
        const donorId = req.body.donorId;
        try{
        await DonorRequest.findByIdAndDelete({_id:req.body.donorId})
        }
        catch(err)
        {
            return res.status(400).json("Something went wrong!");
        }
        return res.status(200).json("Donor Rejected!");

} 

//Reject Needy
export const RejectNeedy = async(req:Request,res:Response,next:NextFunction)=>{
    const needyId = req.body.needyId;
    try{
    await NeedyRequest.findByIdAndDelete({_id:req.body.needyId})
    }
    catch(err)
    {
        return res.status(400).json("Something went wrong!");
    }
    return res.status(200).json("Needy Rejected!");

} 