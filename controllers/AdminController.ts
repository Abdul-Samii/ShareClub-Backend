import { Request,Response,NextFunction, response } from "express";
import { categoryDto, DonorDto, NeedyDto } from "../dto";
import { Category, Donor, DonorFB, DonorRequest, Needy, NeedyFB, NeedyRequest } from "../models";



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
        const {name,email,password,pic,phone,salt,city,country,address,completedAds,
            bookedAds,role,isApprove,fbID,signupType} = data;
            if(signupType == 1)
            { 
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
            completedAds:completedAds,
            bookedAds:bookedAds,
            role:role,
            isApprove:isApprove
        });
        }
        else if(signupType == 2)
        {
            const newNeedy = await NeedyFB.create({
                name:name,
                email:email,
                fbID:fbID,
                signupType:signupType,
                pic:pic,
                phone:phone,
                city:city,
                country:country,
                address:address,
                completedAds:completedAds,
                bookedAds:bookedAds,
                role:role,
                isApprove:isApprove
            });
        }
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
        const {name,email,password,pic,salt,phone,city,country,address,bookedAds,
            activeAds,completedAds,role,isApprove,fbID,signupType} = data;
        if(signupType == 1)
            {   
             const  newDonor = await Donor.create({
                name:name,
                email:email,
                password:password,
                salt:salt,
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
        }
        else if(signupType == 2)
            {   
             const  newDonor = await DonorFB.create({
                name:name,
                email:email,
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
        }
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


//Add New Category
export const AddCategory = async(req:Request,res:Response,next:NextFunction)=>{
    const {name} = <categoryDto>req.body;
    try{
       const newCategory =  await Category.create({
            name:name
        })

        res.status(200).json(newCategory)
    }
    catch(err)
    {
        res.status(403).json({"msg":"Something went wrong!"})
    }
}

//Delete Category
export const DeleteCategory = async(req:Request,res:Response,next:NextFunction)=>{
    const id = req.params.id;
    console.log("Delete",id)
    try{
        await Category.findByIdAndDelete({_id:id})

        res.status(200).json({"msg":"Deleted Successfully!"})
    }
    catch(err)
    {
        res.status(403).json({"msg":"Something went wrong!"})
    }
}

//Get All Categories
export const GetCategory = async(req:Request,res:Response,next:NextFunction)=>{
    console.log("Cat")
    try{
       const Categories =  await Category.find()

        res.status(200).json({"categories":Categories,"msg":"Successfully get all categories"})
    }
    catch(err)
    {
        res.status(403).json({"msg":"Something went wrong!"})
    }
}


//testing
export const YO = async(req:Request,res:Response,next:NextFunction)=>{
    
    return res.status(200).json("Working");

} 




//BLOCK/UNBLOCK
export const BlockUnBlock = async(req:Request,res:Response,next:NextFunction) =>{
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
                         block:mode
                     }
                 })
            }
            else if(type === 'donor')
            {
                await Donor.findOneAndUpdate({_id:userId},{
                    $set:{
                        block:mode
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







//Block Needy
export const BlockNeedy = async(req:Request,res:Response,next:NextFunction)=>{
    const userId = req.body.userId;
    try{
        await Needy.findByIdAndUpdate({_id:userId},{
            $set:{
                block:true
            }
        });
        

    }
    catch(err)
    {
        return res.status(400).json("Something went wrong!");
    }
    return res.status(200).json("Needy Blocked!")
}




//Block Donor
export const BlockDonor = async(req:Request,res:Response,next:NextFunction)=>{
    const userId = req.body.userId;
    try{
        await Donor.findByIdAndUpdate({_id:userId},{
            $set:{
                block:true
            }
        });
        

    }
    catch(err)
    {
        return res.status(400).json("Something went wrong!");
    }
    return res.status(200).json("Donor Blocked!")
}

//UnBlock Needy
export const UnBlockNeedy = async(req:Request,res:Response,next:NextFunction)=>{
    const userId = req.body.userId;
    try{
        await Needy.findByIdAndUpdate({_id:userId},{
            $set:{
                block:false
            }
        });
        

    }
    catch(err)
    {
        return res.status(400).json("Something went wrong!");
    }
    return res.status(200).json("Needy UnBlocked!")
}




//UnBlock Donor
export const UnBlockDonor = async(req:Request,res:Response,next:NextFunction)=>{
    const userId = req.body.userId;
    try{
        await Donor.findByIdAndUpdate({_id:userId},{
            $set:{
                block:false
            }
        });
        

    }
    catch(err)
    {
        return res.status(400).json("Something went wrong!");
    }
    return res.status(200).json("Donor UnBlocked!")
}
