import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import cors from 'cors';
import express from 'express';
import path from 'node:path';
import { createServer as createViteServer } from 'vite';
import { config } from './server/config';
import { pool } from './server/db';
import { errorHandler, notFound } from './server/errors';
import authRoutes from './server/routes/auth';
import listingRoutes from './server/routes/listings';

async function startServer() {
  const app = express();
  const allowedOrigins = config.frontendOrigin.split(',').map((origin) => origin.trim()).filter(Boolean);

  app.disable('x-powered-by');
  app.use(cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Origin is not allowed by CORS.'));
    },
  }));
  app.use(express.json({ limit: '1mb' }));
  app.use('/uploads', express.static(config.uploadDirectory));

  app.get('/api/health', async (_req, res, next) => {
    try {
      await pool.query('SELECT 1');
      res.json({ status: 'ok' });
    } catch (error) {
      next(error);
    }
  });
  app.use('/api/auth', authRoutes);
  app.use('/api/listings', listingRoutes);

  if (config.nodeEnv !== 'production') {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')));
  }

  app.use(notFound);
  app.use(errorHandler);

  app.listen(config.port, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${config.port}`);
  });
}

startServer().catch((error) => {
  console.error('Server startup failed:', error.message);
  process.exit(1);
});
