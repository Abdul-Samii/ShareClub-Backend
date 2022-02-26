import express from "express"; 
import App from './services/ExpressApp';
import dbConnection from './services/Database';


const StartServer = async()=>{
    const app = express();
    await dbConnection();
    await App(app);

    const port = process.env.PORT || 6600

    app.listen(port,()=>{
        console.clear()
        console.log('Application is running at PORT' ,port)
    })
}

StartServer();