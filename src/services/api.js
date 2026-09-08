const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Retrieve media placeholder information from the backend.
 * 
 * @param {string} url - The user-provided Instagram media link
 * @returns {Promise<object>} - The backend response JSON
 */
export async function retrieveMediaFromApi(url) {
  try {
    const response = await fetch(`${API_URL}/api/media/retrieve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message || `API error (HTTP ${response.status})`);
    }

    return body;
  } catch (error) {
    console.error('[API Service Error] retrieveMediaFromApi failed:', error);
    if (error.message && !error.message.includes('Failed to fetch')) {
      throw error;
    }
    throw new Error('Connection refused: Unable to connect to the backend server. Make sure the Node server is started on ' + API_URL);
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
