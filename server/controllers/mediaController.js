import { getMediaPlaceholderInfo } from '../services/mediaService.js';
import { Readable } from 'stream';

/**
 * Controller to handle POST /api/media/retrieve requests.
 * Triggers validation body middleware first, then returns compliant mock media data.
 */
export async function retrieveMedia(req, res, next) {
  try {
    const { url } = req.body;
    const result = await getMediaPlaceholderInfo(url);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to handle GET /api/media/download requests.
 * Proxies the file stream and forces the file to download with a correct extension.
 */
export async function downloadMediaFile(req, res, next) {
  try {
    const { url, type } = req.query;
    if (!url) {
      return res.status(400).send('URL query parameter is required.');
    }

    console.log(`[Proxy Download] Streaming media from: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      }
    });

    if (!response.ok) {
      console.warn(`[Proxy Download] Direct stream returned HTTP ${response.status}. Redirecting directly to media source.`);
      return res.redirect(url);
    }

    const ext = type?.toLowerCase() === 'post' ? 'jpg' : 'mp4';
    const contentType = type?.toLowerCase() === 'post' ? 'image/jpeg' : 'video/mp4';

    // Set headers to force download with clean filename and extension
    res.attachment(`instasave_${Date.now()}.${ext}`);
    res.setHeader('Content-Type', contentType);

    // Stream the web readable stream to express response
    Readable.fromWeb(response.body).pipe(res);

  } catch (error) {
    console.error('[Proxy Download Controller Error]', error);
    // If proxy streaming fails, fallback to direct redirect so user still gets the file
    if (req.query.url) {
      return res.redirect(req.query.url);
    }
    next(error);
  }
}
