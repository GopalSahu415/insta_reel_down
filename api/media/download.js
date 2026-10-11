export default async function handler(req, res) {
  const { url } = req.query || {};
  if (!url) {
    return res.status(400).send('URL query parameter is required.');
  }

  // Redirect client directly to CDN asset for high-speed download
  return res.redirect(302, url);
}
