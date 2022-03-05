import express,{Request,Response,NextFunction} from 'express';
import { BookDonationAd, GetNeedy, ViewBookedDonations, ViewNearbyDonations } from '../controllers';

const router = express.Router();

router.post('/getneedy',GetNeedy);
router.post('/bookad',BookDonationAd);
router.get('/nearbydonations',ViewNearbyDonations);
router.get('/bookeddonations',ViewBookedDonations);
export {router as NeedyRoute};