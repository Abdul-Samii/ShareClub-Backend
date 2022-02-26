import express,{Request,Response,NextFunction} from 'express';
import { BookDonationAd, ViewNearbyDonors } from '../controllers';

const router = express.Router();

router.post('/bookad',BookDonationAd);
router.get('/nearbydonor',ViewNearbyDonors);
export {router as NeedyRoute};