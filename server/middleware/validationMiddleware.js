import { AppError } from './errorMiddleware.js';
import { validateInstagramUrl } from '../utils/urlValidator.js';

/**
 * Middleware to validate media retrieval request bodies.
 * Verifies that the URL is provided and follows standard Instagram formatting.
 */
export function validateRetrieveBody(req, res, next) {
  const { url } = req.body;

  if (!url || typeof url !== 'string' || !url.trim()) {
    return next(new AppError('Please paste an Instagram Reel, Post, or Story link to continue.', 400));
  }

  if (!validateInstagramUrl(url)) {
    return next(new AppError('Please enter a valid Instagram URL (e.g., https://www.instagram.com/p/...)', 400));
  }

  next();
}
