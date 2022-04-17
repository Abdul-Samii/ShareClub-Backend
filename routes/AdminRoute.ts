import express,{Request,Response,NextFunction} from 'express';
import { AddCategory, ApproveDonor, ApproveNeedy, GetCategory, RejectDonor, RejectNeedy, ViewDonorRequests, ViewNeedyRequests, YO } from '../controllers';

const router = express.Router();

router.post('/approveneedy',ApproveNeedy);
router.post('/approvedonor',ApproveDonor);
router.post('/rejectneedy',RejectNeedy);
router.post('/rejectdonor',RejectDonor);
router.get('/needyrequests',ViewNeedyRequests);
router.get('/donorrequests',ViewDonorRequests);
router.post('/category',AddCategory);
router.get('/category',GetCategory);
router.get('/yo',YO)

export {router as AdminRoute};