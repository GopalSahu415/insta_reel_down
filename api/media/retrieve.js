import { getMediaPlaceholderInfo } from '../../server/services/mediaService.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Handle body parsing if req.body is string or JSON
    let bodyData = req.body;
    if (typeof bodyData === 'string') {
      try {
        bodyData = JSON.parse(bodyData);
      } catch {
        bodyData = {};
      }
    }

    const { url } = bodyData || {};
    if (!url) {
      return res.status(400).json({ success: false, message: 'Instagram URL is required.' });
    }

    const result = await getMediaPlaceholderInfo(url);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('[Vercel Serverless Error] retrieve failed:', error);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to retrieve Instagram media. Please try again.',
    });
  }
}
