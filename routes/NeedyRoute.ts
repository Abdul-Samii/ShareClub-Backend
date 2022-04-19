import express,{Request,Response,NextFunction} from 'express';
import { BookDonationAd, CancelDonationAd, CompleteDonationAd, GetNeedy, ViewBookedDonations, ViewNearbyDonations } from '../controllers';

const router = express.Router();

router.post('/getneedy',GetNeedy);
router.post('/bookad',BookDonationAd);
router.post('/canceldonation',CancelDonationAd);
router.get('/nearbydonations',ViewNearbyDonations);
router.get('/bookeddonations',ViewBookedDonations);
router.post('/completedonation',CompleteDonationAd);
export {router as NeedyRoute};