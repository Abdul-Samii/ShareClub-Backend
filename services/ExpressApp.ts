import express, {Application} from 'express';
import bodyParser from 'body-parser';
import { AdminRoute, AuthRoute, DonorRoute, NeedyRoute } from '../routes';


export default async(app:Application)=>{
    

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    

    //Routes
    app.use('/auth',AuthRoute);
    app.use('/admin',AdminRoute);
    app.use('/donor',DonorRoute);
    app.use('/needy',NeedyRoute);

    return app;
}