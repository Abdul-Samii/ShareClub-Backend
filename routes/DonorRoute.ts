import express,{Request,Response,NextFunction} from 'express';
import { AddDonationAd, GetDonor, ViewDonorBookedDonations } from '../controllers';

const router = express.Router();

router.post('/donationad',AddDonationAd);
router.post('/getdonor',GetDonor);
router.get('/bookeddonations',ViewDonorBookedDonations);
export {router as DonorRoute};