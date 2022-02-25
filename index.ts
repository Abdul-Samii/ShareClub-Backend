import express from "express"; 
import dotenv from "dotenv";
const app = express();
dotenv.config();

const port = process.env.PORT || 6600

app.listen(port,()=>{
    console.clear()
    console.log('Application is running at PORT' ,port)
})