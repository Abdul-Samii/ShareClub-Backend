import express,{Request,Response,NextFunction} from 'express';
import { BookDonationAd } from '../controllers/NeedyController';

const router = express.Router();

router.post('/bookad',BookDonationAd);

export {router as NeedyRoute};