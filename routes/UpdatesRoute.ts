import express from 'express';
import { ChangeMessagesMode, ChangeName, ChangePassword, ChangePrivateMode } from '../controllers';


const router = express.Router();



router.post('/password',ChangePassword);
router.post('/name',ChangeName);
router.post('/privatemode',ChangePrivateMode);
router.post('/messagesmode',ChangeMessagesMode);
export {router as UpdatesRouter};