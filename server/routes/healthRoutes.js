import express from 'express';
import { getHealth } from '../controllers/healthController.js';

const router = express.Router();

// Mount root path of this sub-router
router.get('/', getHealth);

export default router;
