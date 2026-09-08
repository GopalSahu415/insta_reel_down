import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler, AppError } from './middleware/errorMiddleware.js';
import healthRoutes from './routes/healthRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Load environmental variables - Trigger Restart
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend client interactions (allow both dev defaults and explicit port configurations)
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
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

// Fallback for unmatched API routes
app.use('*', (req, res, next) => {
  next(new AppError(`Cannot find endpoint ${req.originalUrl} on this server.`, 404));
});

// Centralized error handling middleware
app.use(errorHandler);

// Launch server listener
const server = app.listen(PORT, () => {
  console.log(`[InstaSave Server] Running on http://localhost:${PORT}`);
  console.log(`[InstaSave Server] Health-check active: http://localhost:${PORT}/api/health`);
});

export default server;
