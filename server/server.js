import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { errorHandler, AppError } from './middleware/errorMiddleware.js';
import healthRoutes from './routes/healthRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Load environmental variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable dynamic CORS for frontend client interactions (supports Render, Vercel, localhost, and custom domains)
app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server, mobile, curl, or same-origin requests (where origin is undefined)
    if (!origin) return callback(null, true);
    // Allow any incoming origin safely
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Built-in JSON parser middleware
app.use(express.json());

// API Route mounting
app.use('/api/health', healthRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/auth', authRoutes);

// Root health & status endpoint
app.get('/api', (req, res) => {
  res.status(200).json({
    status: 'online',
    name: 'InstaSave API Server',
    version: '1.0.0',
    health: '/api/health',
  });
});

// Serve frontend build if dist/ exists (enables single-service full-stack deployment on Render)
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  // If dist is not built, provide root server status info
  app.get('/', (req, res) => {
    res.status(200).json({
      status: 'online',
      name: 'InstaSave API Server',
      version: '1.0.0',
      health: '/api/health',
      timestamp: new Date().toISOString(),
    });
  });
}

// Fallback for unmatched API routes
app.use('*', (req, res, next) => {
  next(new AppError(`Cannot find endpoint ${req.originalUrl} on this server.`, 404));
});

// Centralized error handling middleware
app.use(errorHandler);

// Launch server listener only when running directly (not when imported as a serverless function)
const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename);
if (isMain && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[InstaSave Server] Running on http://localhost:${PORT}`);
    console.log(`[InstaSave Server] Health-check active: http://localhost:${PORT}/api/health`);
  });
}

export default app;

