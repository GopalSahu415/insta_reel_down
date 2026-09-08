import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load variables
dotenv.config();

const realToken = process.env.META_ACCESS_TOKEN;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SESSION_FILE = path.join(__dirname, '..', 'session_store.json');

function loadSession() {
  const defaultSession = realToken
    ? {
        isConnected: true,
        accessToken: realToken,
        status: 'connected',
        accountName: 'Meta Developer Account (Active)',
        isSandbox: false,
      }
    : {
        isConnected: false,
        accessToken: null,
        status: 'disconnected',
        accountName: null,
        isSandbox: true,
      };

  try {
    if (fs.existsSync(SESSION_FILE)) {
      const data = fs.readFileSync(SESSION_FILE, 'utf8');
      const saved = JSON.parse(data);
      // Ensure we preserve production mode if realToken was supplied/configured
      if (realToken) {
        return {
          isConnected: true,
          accessToken: realToken,
          status: 'connected',
          accountName: 'Meta Developer Account (Active)',
          isSandbox: false,
        };
      }
      return saved;
    }
  } catch (err) {
    console.error('[Session Store Error] Failed to read session:', err);
  }
  return defaultSession;
}

function saveSession(state) {
  try {
    fs.writeFileSync(SESSION_FILE, JSON.stringify(state, null, 2), 'utf8');
  } catch (err) {
    console.error('[Session Store Error] Failed to write session:', err);
  }
}

// Global session container (initialized from file store)
let sessionState = loadSession();

/**
 * Returns current API session information.
 */
export function getSession(req, res) {
  res.status(200).json({
    success: true,
    data: sessionState,
  });
}

/**
 * Connects/authorizes a mock user profile or handles mock OAuth callback state.
 */
export function connectAccount(req, res) {
  const { state } = req.body; // 'connected' | 'expired' | 'disconnected'

  // If real token exists, prevent overriding to maintain production test viability
  if (realToken) {
    return res.status(200).json({
      success: true,
      data: sessionState,
    });
  }

  if (state === 'expired') {
    sessionState = {
      isConnected: true,
      accessToken: 'MOCK_EXPIRED_TOKEN_VITE_INSTASAVE',
      status: 'expired',
      accountName: 'CreatorSandbox (Expired Token)',
      isSandbox: true,
    };
  } else if (state === 'disconnected') {
    sessionState = {
      isConnected: false,
      accessToken: null,
      status: 'disconnected',
      accountName: null,
      isSandbox: true,
    };
  } else {
    sessionState = {
      isConnected: true,
      accessToken: 'MOCK_VALID_TOKEN_VITE_INSTASAVE',
      status: 'connected',
      accountName: 'CreatorSandbox (Active)',
      isSandbox: true,
    };
  }

  saveSession(sessionState);

  res.status(200).json({
    success: true,
    data: sessionState,
  });
}

/**
 * Resets the token session and disconnects the account.
 */
export function disconnectAccount(req, res) {
  // If real token is configured, we don't clear the config but mock disconnection in the session container
  sessionState = {
    isConnected: false,
    accessToken: null,
    status: 'disconnected',
    accountName: null,
    isSandbox: !realToken,
  };

  saveSession(sessionState);

  res.status(200).json({
    success: true,
    data: sessionState,
  });
}

/**
 * Helper to fetch internal session configurations.
 */
export function getActiveSession() {
  // Check if env variable was updated dynamically
  const token = process.env.META_ACCESS_TOKEN || realToken;
  if (token && sessionState.status === 'connected') {
    return {
      ...sessionState,
      accessToken: token,
      isSandbox: false,
    };
  }
  return sessionState;
}
