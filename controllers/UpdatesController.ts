import { Request,Response,NextFunction } from "express";
import { Needy,Donor,Admin } from "../models";
import { GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } from "../utility";


//Change password
export const ChangePassword = async(req:Request,res:Response,next:NextFunction) =>{
    const type = req.body.type;
    const oldPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;
    const userId = req.body.userId;
    var user;

    try{
    if(type === 'needy')
    {
         user = await Needy.findById({_id:userId});
    }
    else if(type === 'donor')
    {
         user = await Donor.findById({_id:userId});
    }
    else if(type === 'admin')
    {
         user = await Admin.findById({_id:userId});
    }

    const temp = JSON.stringify(user)
    const userDetail = JSON.parse(temp)
    if(userDetail!=null)
    {
        const validation = await ValidatePassword(oldPassword,userDetail.password,userDetail.salt);
        if(validation)
        {
            
            //generate salt
            const salt = await GenerateSalt();
            //encrpt password using salt
            const hashPassword = await GeneratePassword(newPassword,salt);

            console.log("Hash ",hashPassword)
            if(type === 'needy')
            {
                 await Needy.findOneAndUpdate({_id:userId},{
                     $set:{
                         salt:salt,
                         password:hashPassword
                     }
                 })
            }
            else if(type === 'donor')
            {
                await Donor.findOneAndUpdate({_id:userId},{
                    $set:{
                        salt:salt,
                        password:hashPassword
                    }
                })
            }
            else if(type === 'admin')
            {
                await Admin.findOneAndUpdate({_id:userId},{
                    $set:{
                        salt:salt,
                        password:hashPassword
                    }
                })
            }



            return res.status(200).json({msg:"Password Changed!"});
        }
        else{
            return res.status(200).json({msg:"Invalid Password"})
        }
    }
}
catch(err)
{
    return res.status(200).json({"msg":"Something went wrong!"})
}

}




//Change Name
export const ChangeName = async(req:Request,res:Response,next:NextFunction) =>{
    const type = req.body.type;
    const newName = req.body.name;
    const userId = req.body.userId;
    var user;

    try{
    if(type === 'needy')
    {
         user = await Needy.findById({_id:userId});
    }
    else if(type === 'donor')
    {
         user = await Donor.findById({_id:userId});
    }
    else if(type === 'admin')
    {
         user = await Admin.findById({_id:userId});
    }

    const temp = JSON.stringify(user)
    const userDetail = JSON.parse(temp)
    if(userDetail!=null)
    {
                    
            if(type === 'needy')
            {
                 await Needy.findOneAndUpdate({_id:userId},{
                     $set:{
                         name:newName
                     }
                 })
            }
            else if(type === 'donor')
            {
                await Donor.findOneAndUpdate({_id:userId},{
                    $set:{
                        name:newName
                    }
                })
            }
            else if(type === 'admin')
            {
                await Admin.findOneAndUpdate({_id:userId},{
                    $set:{
                        name:newName
                    }
                })
            }



            return res.status(200).json({msg:"Name Updated!"});
        
    }
}
catch(err)
{
    return res.status(403).json({"msg":"Something went wrong!"})
}

}



//Change Private Mode
export const ChangePrivateMode = async(req:Request,res:Response,next:NextFunction) =>{
    const type = req.body.type;
    const mode = req.body.mode;
    const userId = req.body.userId;
    var user;
console.log("Checking   ",type, mode, userId)
    try{
    if(type === 'needy')
    {
         user = await Needy.findById({_id:userId});
    }
    else if(type === 'donor')
    {
         user = await Donor.findById({_id:userId});
    }
    

    const temp = JSON.stringify(user)
    const userDetail = JSON.parse(temp)
    if(userDetail!=null)
    {
                    
            if(type === 'needy')
            {
                 await Needy.findOneAndUpdate({_id:userId},{
                     $set:{
                         privateMode:mode
                     }
                 })
            }
            else if(type === 'donor')
            {
                await Donor.findOneAndUpdate({_id:userId},{
                    $set:{
                        privateMode:mode
                    }
                })
            }
           

            return res.status(200).json({msg:"Mode Updated!"});
        
    }
}
catch(err)
{
    return res.status(403).json({"msg":"Something went wrong!"})
}

}



//Change Messages Mode
export const ChangeMessagesMode = async(req:Request,res:Response,next:NextFunction) =>{
    const type = req.body.type;
    const mode = req.body.mode;
    const userId = req.body.userId;
    var user;

    try{
    if(type === 'needy')
    {
         user = await Needy.findById({_id:userId});
    }
    else if(type === 'donor')
    {
         user = await Donor.findById({_id:userId});
    }
    

    const temp = JSON.stringify(user)
    const userDetail = JSON.parse(temp)
    if(userDetail!=null)
    {
                    
            if(type === 'needy')
            {
                 await Needy.findOneAndUpdate({_id:userId},{
                     $set:{
                         allowMessages:mode
                     }
                 })
            }
            else if(type === 'donor')
            {
                await Donor.findOneAndUpdate({_id:userId},{
                    $set:{
                        allowMessages:mode
                    }
                })
            }
           

            return res.status(200).json({msg:"Mode Updated!"});
        
    }
}
catch(err)
{
    return res.status(403).json({"msg":"Something went wrong!"})
}
}



//Change Address
export const ChangeAddress = async(req:Request,res:Response,next:NextFunction) =>{
    const type = req.body.type;
    const city = req.body.city;
    const country = req.body.country;
    const address = req.body.address;
    const userId = req.body.userId;
    var user;

    try{
    if(type === 'needy')
    {
         user = await Needy.findById({_id:userId});
    }
    else if(type === 'donor')
    {
         user = await Donor.findById({_id:userId});
    }
    else if(type === 'admin')
    {
         user = await Donor.findById({_id:userId});
    }
    
    const temp = JSON.stringify(user)
    const userDetail = JSON.parse(temp)
    if(userDetail!=null)
    {
                    
            if(type === 'needy')
            {
                 await Needy.findOneAndUpdate({_id:userId},{
                     $set:{
                         city:city,
                         country:country,
                         address:address
                     }
                 })
            }
            else if(type === 'donor')
            {
                await Donor.findOneAndUpdate({_id:userId},{
                    $set:{
                        city:city,
                        country:country,
                        address:address
                    }
                })
            }
            else if(type === 'admin')
            {
                await Admin.findOneAndUpdate({_id:userId},{
                    $set:{
                        city:city,
                        country:country,
                        address:address
                    }
                })
            }
           

            return res.status(200).json({msg:"Address Updated!"});
        
    }
}
catch(err)
{
    return res.status(403).json({"msg":"Something went wrong!"})
}

}