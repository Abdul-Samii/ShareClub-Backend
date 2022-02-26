import { Request,Response,NextFunction } from "express";
import { DonorDto, NeedyDto } from "../dto";
import { Donor, DonorRequest, Needy, NeedyRequest } from "../models";
import { GeneratePassword,GenerateSalt } from "../utility";


//Needy Registration
export const RegisterNeedy  =async(req:Request,res:Response,next:NextFunction)=>{
    const {name,email,password,pic,phone,city,country,address,acceptedAds,
        currentAds,role,isApprove} = <NeedyDto>req.body;

    const alreadyRegister = await Needy.find({email:email});
    const alreadyRequested = await NeedyRequest.find({email:email});

    if(alreadyRegister[0]!=null || alreadyRequested[0]!=null)
    {
        return res.status(400).json("Error! A User already exist with this email")
    }
    else{
        //generate salt
        const salt = await GenerateSalt();
        //encrpt password using salt
        const hashPassword = await GeneratePassword(password,salt);

        const createNeedy = await NeedyRequest.create({
            name:name,
            email:email,
            password:hashPassword,
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
        
        return res.status(200).json(createNeedy);
    }

}



//Donor Registration
//Needy Registration
export const RegisterDonor  =async(req:Request,res:Response,next:NextFunction)=>{
    const {name,email,password,pic,phone,city,country,address,ads,
        activeAds,role,isApprove} = <DonorDto>req.body;

    const alreadyRegister = await Donor.find({email:email});
    const alreadyRequested = await DonorRequest.find({email:email});

    if(alreadyRegister[0]!=null || alreadyRequested[0]!=null)
    {
        return res.status(400).json("Error! A User already exist with this email")
    }
    else{
        //generate salt
        const salt = await GenerateSalt();
        //encrpt password using salt
        const hashPassword = await GeneratePassword(password,salt);

        const createNeedy = await NeedyRequest.create({
            name:name,
            email:email,
            password:hashPassword,
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
        
        return res.status(200).json(createNeedy);
    }

}