// Cleanly resolve API URL:
// 1. If VITE_API_URL is configured, use it (stripping trailing slash).
// 2. Otherwise default to relative path '' (works seamlessly on Vercel and via Vite dev proxy).
export const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

/**
 * Retrieve media information from the backend.
 * 
 * @param {string} url - The user-provided Instagram media link
 * @returns {Promise<object>} - The backend response JSON
 */
export async function retrieveMediaFromApi(url) {
  try {
    const endpoint = `${API_URL}/api/media/retrieve`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    const contentType = response.headers.get('content-type') || '';
    let body;
    if (contentType.includes('application/json')) {
      body = await response.json();
    } else {
      const text = await response.text();
      console.error('[API Non-JSON Response]:', text);
      throw new Error('Server returned an unexpected response. Please check the Instagram link or try again in a few seconds.');
    }

    if (!response.ok) {
      throw new Error(body.message || `API error (HTTP ${response.status})`);
    }

    return body;
  } catch (error) {
    console.error('[API Service Error] retrieveMediaFromApi failed:', error);
    if (error.message && !error.message.includes('Failed to fetch')) {
      throw error;
    }
    throw new Error(
      'Unable to connect to the media server. Please verify your internet connection or try again in a moment.'
    );
  }
}

/**
 * Fetches the current Meta Developer API session status.
 */
export async function getAuthSession() {
  try {
    const response = await fetch(`${API_URL}/api/auth/session`);
    const body = await response.json();
    if (!response.ok) throw new Error(body.message || 'Failed to fetch session');
    return body;
  } catch (error) {
    console.error('[API Service Error] getAuthSession failed:', error);
    throw error;
  }
}

/**
 * Trigger mock/simulation connection with target profile status preset.
 * 
 * @param {string} state - 'connected' | 'expired' | 'disconnected'
 */
export async function connectAuthMock(state) {
  try {
    const response = await fetch(`${API_URL}/api/auth/connect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ state }),
    });
    const body = await response.json();
    if (!response.ok) throw new Error(body.message || 'Failed to connect account');
    return body;
  } catch (error) {
    console.error('[API Service Error] connectAuthMock failed:', error);
    throw error;
  }
}

/**
 * Revokes mock token session status.
 */
export async function disconnectAuthMock() {
  try {
    const response = await fetch(`${API_URL}/api/auth/disconnect`, {
      method: 'POST',
    });
    const body = await response.json();
    if (!response.ok) throw new Error(body.message || 'Failed to disconnect account');
    return body;
  } catch (error) {
    console.error('[API Service Error] disconnectAuthMock failed:', error);
    throw error;
  }
}
