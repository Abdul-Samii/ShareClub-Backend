import express,{Request,Response,NextFunction} from 'express';
import { ApproveDonor, ApproveNeedy, RejectDonor, RejectNeedy, ViewDonorRequests, ViewNeedyRequests } from '../controllers';

const router = express.Router();

router.post('/approveneedy',ApproveNeedy);
router.post('/approvedonor',ApproveDonor);
router.post('/rejectneedy',RejectNeedy);
router.post('/rejectdonor',RejectDonor);
router.get('/needyrequests',ViewNeedyRequests);
router.get('/donorrequests',ViewDonorRequests)
export {router as AdminRoute};