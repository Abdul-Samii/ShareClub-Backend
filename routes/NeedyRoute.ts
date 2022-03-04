import express,{Request,Response,NextFunction} from 'express';
import { BookDonationAd, GetNeedy, ViewNearbyDonations } from '../controllers';

const router = express.Router();

router.post('/getneedy',GetNeedy);
router.post('/bookad',BookDonationAd);
router.get('/nearbydonations',ViewNearbyDonations);
export {router as NeedyRoute};