export interface DonorDto{
    name:string;
    email:string;
    password:string;
    pic:string;
    phone:string;
    city:string;
    country:string;
    state:string;
    address:string;
    signupType:number;
    fbID:string;
    activeAds:any;
    bookedAds:any;
    completedAds:any;
    role:string;
    privateMode:boolean;
    allowMessages:boolean;
    isApprove:boolean;
}