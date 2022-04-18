import { Request,Response,NextFunction } from "express";
import { AdminDto, AuthPayload, DonorDto, LoginInput, NeedyDto } from "../dto";
import { Admin, Donor, DonorFB, DonorRequest, Needy, NeedyFB, NeedyRequest } from "../models";
import { GeneratePassword,GenerateSalt, GenerateSignature, ValidatePassword } from "../utility";


//Needy Registration
export const RegisterNeedy  =async(req:Request,res:Response,next:NextFunction)=>{
    const {name,email,password,pic,phone,city,country,address,acceptedAds,
        currentAds,role,isApprove,signupType,fbID} = <NeedyDto>req.body;

    const alreadyRegister = await Needy.find({email:email});
    const alreadyRequested = await NeedyRequest.find({email:email});
    const alreadyFB = await NeedyFB.find({email:email});
    if(alreadyRegister[0]!=null || alreadyRequested[0]!=null || alreadyFB[0]!=null)
    {
        console.log(alreadyRegister[0]);
        return res.status(200).json({"msg":"Error! A User already exist with this email"})
    }
    else{
        //generate salt
        const salt = await GenerateSalt();

        var hashPassword;
        if(signupType == 1)
        {
            //encrpt password using salt
            hashPassword = await GeneratePassword(password,salt);
        }
        

        const createNeedy = await NeedyRequest.create({
            name:name,
            email:email,
            password:hashPassword,
            salt:salt,
            fbID:fbID,
            signupType:signupType,
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
        
        return res.status(200).json({"msg":"Your Registration request is sent for approval"});
    }

}



//Donor Registration
export const RegisterDonor  =async(req:Request,res:Response,next:NextFunction)=>{
    console.log("LOC")
    const {name,email,password,pic,phone,city,country,address,bookedAds,
        activeAds,completedAds,role,isApprove,signupType,fbID} = <DonorDto>req.body;

    const alreadyRegister = await Donor.find({email:email});
    const alreadyRequested = await DonorRequest.find({email:email});
    const alreadyFB = await DonorFB.find({email:email});
    if(alreadyRegister[0]!=null || alreadyRequested[0]!=null || alreadyFB[0]!=null)
    {
        return res.status(200).json({"msg":"Error! A User already exist with this email"})
    }
    else{
        //generate salt
        var hashPassword;    
        const salt = await GenerateSalt();
        if(signupType == 1)
        {
            //encrpt password using salt
            hashPassword = await GeneratePassword(password,salt);
        }
        
            const createDonor = await DonorRequest.create({
                name:name,
                email:email,
                password:hashPassword,
                salt:salt,
                fbID:fbID,
                signupType:signupType,
                pic:pic,
                phone:phone,
                city:city,
                country:country,
                address:address,
                bookedAds:bookedAds,
                completedAds:completedAds,
                activeAds:activeAds,
                role:role,
                isApprove:isApprove
            });
        
        
        return res.status(200).json({"msg":"Your Registration request is sent for approval"});
    }

}



//Admin Registration 
export const RegisterAdmin  =async(req:Request,res:Response,next:NextFunction)=>{
    const {name,email,password,pic,phone,city,country,address,role} = <AdminDto>req.body;

    const alreadyRegister = await Admin.find({email:email});

    if(alreadyRegister[0]!=null)
    {
        return res.status(400).json("Error! A User already exist with this email")
    }
    else{
        //generate salt
        const salt = await GenerateSalt();
        //encrpt password using salt
        const hashPassword = await GeneratePassword(password,salt);

        const createAdmin = await Admin.create({
            name:name,
            email:email,
            password:hashPassword,
            salt:salt,
            pic:pic,
            phone:phone,
            city:city,
            country:country,
            address:address,
            role:role
            });
        
        return res.status(200).json(createAdmin);
    }

}



//Login 
export const Login = async(req:Request,res:Response,next:NextFunction) =>{
    console.log("yes here")
    const {email,password,type,loginType,fbID} = <LoginInput>req.body;
    var existingUser;
    if(loginType == 1)
    {
        if(type == "needy")
        {
            existingUser = await Needy.find({email:email});
        }
        else if(type == "donor")
        {
            existingUser = await Donor.find({email:email});
        }
        else if(type == "admin")
        {
            existingUser = await Admin.find({email:email});
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
                return res.status(200).json({token :token,msg:"You are Logged in",userId:loginUser[0]._id,type:type,signupType:loginUser[0].signupType});
            }
            else{
                return res.status(200).json({msg:"Invalid Password"})
            }
        }
        else{
            return res.status(200).json({msg:"User not found"});
        }
    }

    else if(loginType == 2)
    {
        var existingUser;
        if(type == "needy")
        {
            existingUser = await NeedyFB.find({email:email,fbID:fbID});
        }
        else if(type == "donor")
        {
            existingUser = await DonorFB.find({email:email,fbID:fbID});
        }
        const temp = JSON.stringify(existingUser)
        const loginUser = JSON.parse(temp)
        console.log(loginUser[0])
        if(loginUser[0]!=null)
        {
            const token = GenerateSignature({
                _id:loginUser[0]._id,
                email:loginUser[0].email,
                name:loginUser[0].name,
                role:loginUser[0].role
            })
            return res.status(200).json({token :token,msg:"You are Logged in",userId:loginUser[0]._id,type:type,signupType:loginUser[0].signupType});
        }
        else{
            return res.status(200).json({msg:"User not Found"})
        }
    }
}