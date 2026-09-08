/**
 * Validates whether a given string is a valid public Instagram media URL.
 * Matches Reels, Posts, Stories, and IGTV.
 * 
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if the URL is valid, false otherwise
 */
export function validateInstagramUrl(url) {
  if (!url || typeof url !== 'string') {
    return false;
  }

  // Regular expression to match standard Instagram link formats:
  // - https://www.instagram.com/p/C_abc123/ (Post)
  // - https://www.instagram.com/reel/C_abc123/ (Reel)
  // - https://www.instagram.com/stories/username/12345/ (Story)
  // - https://www.instagram.com/tv/C_abc123/ (IGTV)
  const instagramRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|reels|stories|tv|s)\/([a-zA-Z0-9_-]+)/i;

  return instagramRegex.test(url.trim());
}
