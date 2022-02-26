import { Request,Response,NextFunction } from "express";
import { AuthPayload, DonorDto, LoginInput, NeedyDto } from "../dto";
import { Donor, DonorRequest, Needy, NeedyRequest } from "../models";
import { GeneratePassword,GenerateSalt, GenerateSignature, ValidatePassword } from "../utility";


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
        
        return res.status(200).json(createNeedy);
    }

}



//Donor Registration
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

        const createNeedy = await DonorRequest.create({
            name:name,
            email:email,
            password:hashPassword,
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
        
        return res.status(200).json(createNeedy);
    }

}



//Login 
export const Login = async(req:Request,res:Response,next:NextFunction) =>{
    const {email,password,type} = <LoginInput>req.body;
    var existingUser;
    if(type == "needy")
    {
         existingUser = await Needy.find({email:email});
    }
    else if(type == "donor")
    {
         existingUser = await Donor.find({email:email});
    }
    const temp = JSON.stringify(existingUser)
    const loginUser = JSON.parse(temp)
    console.log(loginUser[0])
    if(loginUser[0] !=null)
    {
        const validation = await ValidatePassword(password,loginUser[0].password,loginUser[0].salt);
        if(validation)
        {
            const token = GenerateSignature({
                _id:loginUser[0]._id,
                email:loginUser[0].email,
                name:loginUser[0].name,
                role:loginUser[0].role
            })
            return res.status(200).json({"token ":token});
        }
        else{
            return res.status(400).json({"message":"Invalid Password"})
        }
    }
    else{
        return res.status(404).json({"message":"User not found"});
    }
}