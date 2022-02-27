import express,{Request,Response,NextFunction} from 'express';
import { Login, RegisterAdmin, RegisterDonor, RegisterNeedy } from '../controllers';
import { Authenticate } from '../middleware';

const router = express.Router();

router.post('/Needy',RegisterNeedy);
router.post('/Donor',RegisterDonor);
router.post('/admin',RegisterAdmin);
router.post('/login',Login);
router.use(Authenticate);

export {router as AuthRoute};