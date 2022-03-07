import express from 'express';
import { ChangeAddress, ChangeMessagesMode, ChangeName, ChangePassword, ChangePrivateMode } from '../controllers';


const router = express.Router();



router.post('/password',ChangePassword);
router.post('/name',ChangeName);
router.post('/privatemode',ChangePrivateMode);
router.post('/messagesmode',ChangeMessagesMode);
router.post('/address',ChangeAddress);
export {router as UpdatesRouter};