import express,{Request,Response,NextFunction} from 'express';
import { AddCategory, ApproveDonor, ApproveNeedy, BlockDonor, BlockNeedy, BlockUnBlock, DeleteCategory, GetCategory, RejectDonor, RejectNeedy, UnBlockDonor, UnBlockNeedy, ViewDonorRequests, ViewNeedyRequests, YO } from '../controllers';

const router = express.Router();

router.post('/approveneedy',ApproveNeedy);
router.post('/approvedonor',ApproveDonor);
router.post('/rejectneedy',RejectNeedy);
router.post('/rejectdonor',RejectDonor);
router.get('/needyrequests',ViewNeedyRequests);
router.get('/donorrequests',ViewDonorRequests);
router.post('/category',AddCategory);
router.get('/category',GetCategory);
router.delete('/category/:id',DeleteCategory);
router.post('/blockunblock',BlockUnBlock)
router.get('/yo',YO)



router.post('/blockneedy',BlockNeedy);
router.post('/blockdonor',BlockDonor);
router.post('/unblockneedy',UnBlockNeedy);
router.post('/unblockdonor',UnBlockDonor);

export {router as AdminRoute};