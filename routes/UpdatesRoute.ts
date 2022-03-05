import express from 'express';
import { ChangeName, ChangePassword } from '../controllers';


const router = express.Router();



router.post('/password',ChangePassword);
router.post('/name',ChangeName);
export {router as UpdatesRouter};