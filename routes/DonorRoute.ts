import express,{Request,Response,NextFunction} from 'express';
import { AddDonationAd, GetDonor } from '../controllers';

const router = express.Router();

router.post('/donationad',AddDonationAd);
router.post('/getdonor',GetDonor);

export {router as DonorRoute};