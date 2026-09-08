import express from 'express';
import { retrieveMedia, downloadMediaFile } from '../controllers/mediaController.js';
import { validateRetrieveBody } from '../middleware/validationMiddleware.js';

const router = express.Router();

// Mount retrieval endpoint with schema validation middleware
router.post('/retrieve', validateRetrieveBody, retrieveMedia);

// Mount download proxy endpoint
router.get('/download', downloadMediaFile);

export default router;
