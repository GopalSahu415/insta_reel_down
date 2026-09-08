import express from 'express';
import { getSession, connectAccount, disconnectAccount } from '../controllers/authController.js';

const router = express.Router();

router.get('/session', getSession);
router.post('/connect', connectAccount);
router.post('/disconnect', disconnectAccount);

export default router;
