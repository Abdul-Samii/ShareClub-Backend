import express,{Request,Response,NextFunction} from 'express';
import { AddDonationAd } from '../controllers';

const router = express.Router();

router.post('/donationad',AddDonationAd);

export {router as DonorRoute};