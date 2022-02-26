import express, {Application} from 'express';
import bodyParser from 'body-parser';
import { AdminRoute, AuthRoute } from '../routes';


export default async(app:Application)=>{
    

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    

    //Routes
    app.use('/auth',AuthRoute);
    app.use('/admin',AdminRoute)

    return app;
}