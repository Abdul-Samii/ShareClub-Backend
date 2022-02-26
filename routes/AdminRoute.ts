import express,{Request,Response,NextFunction} from 'express';
import { ApproveDonor, ApproveNeedy, RejectDonor, RejectNeedy } from '../controllers';

const router = express.Router();

router.post('/approveneedy',ApproveNeedy);
router.post('/approvedonor',ApproveDonor);
router.post('/rejectneedy',RejectNeedy);
router.post('/rejectdonor',RejectDonor);

export {router as AdminRoute};