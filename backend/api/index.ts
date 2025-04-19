import { VercelRequest, VercelResponse } from '@vercel/node';
import { initFireORM } from '../src/config/fireorm.js';
import "reflect-metadata";
import express, { Express, Request, Response } from 'express';
import assistantRoutes from '../src/routes/assistant.routes.js';
import cors from 'cors';
import { setupSwagger } from '../src/config/swagger.js';
import dotenv from 'dotenv';
dotenv.config();

async function createApp(): Promise<Express> {
  const app: Express = express();

  setupSwagger(app);

  await initFireORM();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cors({
    origin: process.env.REACT_APP_API_BASE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  app.get('/', (_: Request, res: Response): void => {
    res.send('Seja bem-vindo ao MatchLegal AI API 🚀🚀🚀 ...inicializada com sucesso...');
  });

  app.use('/api', assistantRoutes);
  const userRoutes = (await import('../src/routes/user.routes.js')).default;
  app.use('/api', userRoutes);

  return app;
}

let appPromise: Promise<Express>;

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (!appPromise) {
    appPromise = createApp();
  }
  const app = await appPromise;
  app(req, res);
}