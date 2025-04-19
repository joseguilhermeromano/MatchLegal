import { initFireORM } from './config/fireorm.js';
import "reflect-metadata";
import express, { Express, Request, Response } from 'express';
import assistantRoutes from './routes/assistant.routes.js';
import cors from 'cors';
import { setupSwagger } from './config/swagger.js';

async function start(): Promise<void> {
  try {
    await initFireORM();

    const app: Express = express();

    setupSwagger(app);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
    }));

    app.get('/', (_: Request, res: Response): void => {
    res.send('Seja bem-vindo ao MatchLegal AI API 🚀🚀🚀 ...inicializada com sucesso...');
    });

    app.use('/api', assistantRoutes);

    const userRoutes = (await import('./routes/user.routes.js')).default;
    app.use('/api', userRoutes);
    
    const PORT = parseInt(process.env.PORT || '3000', 10);
    app.listen(PORT, () => {
      console.log(`🚀 Servidor ouvindo na porta ${PORT}`);
    });

  } catch (error) {
    console.error('❌ Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
}

start();
