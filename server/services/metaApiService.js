/**
 * Service to execute requests against official Meta Graph API endpoints.
 * Utilizes native global fetch available in Node.js (v18+).
 */

/**
 * Retrieves the Instagram Business Account ID associated with the user's Facebook Page.
 * 
 * @param {string} accessToken - User access token
 * @returns {Promise<string>} - The Instagram Business ID
 */
export async function getInstagramBusinessAccountId(accessToken) {
  const url = `https://graph.facebook.com/v20.0/me/accounts?fields=instagram_business_account&access_token=${accessToken}`;
  
  try {
    const response = await fetch(url);
    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.error?.message || `Meta OAuth accounts call failed (HTTP ${response.status})`);
    }

    const linkedPage = body.data?.find((page) => page.instagram_business_account);
    if (!linkedPage) {
      throw new Error('Meta Integration Error: No Instagram Business or Creator account was found connected to your authenticated Facebook Pages.');
    }

    return linkedPage.instagram_business_account.id;
  } catch (error) {
    console.error('[Meta API Service Error] getInstagramBusinessAccountId:', error);
    throw error;
  }
}

/**
 * Retrieves the media catalog (Reels, Posts, Stories) for the specified Instagram Business account.
 * 
 * @param {string} igAccountId - Instagram Business account ID
 * @param {string} accessToken - Active access token
 * @returns {Promise<Array>} - Media nodes array
 */
export async function getInstagramMediaList(igAccountId, accessToken) {
  const url = `https://graph.facebook.com/v20.0/${igAccountId}/media?fields=media_type,media_url,permalink,timestamp&access_token=${accessToken}&limit=100`;

  try {
    const response = await fetch(url);
    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.error?.message || `Meta Graph media call failed (HTTP ${response.status})`);
    }

    return body.data || [];
  } catch (error) {
    console.error('[Meta API Service Error] getInstagramMediaList:', error);
    throw error;
  }
}
