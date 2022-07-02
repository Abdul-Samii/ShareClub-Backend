import express, {Application} from 'express';
import bodyParser from 'body-parser';
import { AdminRoute, AuthRoute, DonationRoute, DonorRoute, NeedyRoute,UpdatesRouter } from '../routes';
import cors from 'cors';
export default async(app:Application)=>{
    

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use((req, res, next) => { next(); }, cors({maxAge: 84600}));
    //Routes
    app.use('/auth',AuthRoute);
    app.use('/admin',AdminRoute);
    app.use('/donor',DonorRoute);
    app.use('/needy',NeedyRoute);
    app.use('/update',UpdatesRouter);
    app.use('/donations',DonationRoute);
    return app;
}