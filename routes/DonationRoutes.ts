import express,{Request,Response,NextFunction} from 'express';
import { GetDonationsForMessage} from '../controllers';

const router = express.Router();

router.post('/donationsformsg',GetDonationsForMessage);


export {router as DonationRoute};