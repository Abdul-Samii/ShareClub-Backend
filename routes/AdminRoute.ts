import express,{Request,Response,NextFunction} from 'express';
import { ApproveNeedy } from '../controllers/AdminController';

const router = express.Router();

router.post('/approveneedy',ApproveNeedy);
// router.post('/approveneedy',ApproveNeedy);

export {router as AdminRoute};