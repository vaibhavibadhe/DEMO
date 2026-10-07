// server.js - Smart Clinic System Backend Entry Point
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-role']
}));

app.use(express.json());

// API health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    system: 'Smart Clinic System API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Central API Routes
app.use('/api', apiRoutes);

// 404 handler for unknown API routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Start database and server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[Smart Clinic Server] Running smoothly on http://localhost:${PORT}`);
    console.log(`[Smart Clinic Server] API endpoints available at http://localhost:${PORT}/api`);
  });
};

startServer();
