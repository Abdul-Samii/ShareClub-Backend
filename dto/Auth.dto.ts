export interface AuthPayload{
    _id:string;
    email:string;
    name:string;
    role:string;
}

export interface LoginInput{
    email:string;
    password:string;
    type:string;
    loginType:number;
    fbID:string;
}