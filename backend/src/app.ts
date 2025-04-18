import { initFireORM } from './config/fireorm.js';
import "reflect-metadata";
import express, { Express, Request, Response } from 'express';
import { swaggerUi, swaggerSpec } from "./config/swagger.js";
import assistantRoutes from './routes/assistant.routes.js';

const app: Express = express();

async function startServer(): Promise<void> {
  try {
    // 1. Initialize FireORM first
    await initFireORM();
    console.log('✅ FireORM initialized successfully');

    const userRoutes = (await import('./routes/user.routes.js')).default;

    // 2. Configure Express middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // 3. Basic route
    app.get('/', (_: Request, res: Response): void => {
      res.send('Olá, seja bem-vindo ao MatchLegal AI API 🚀🚀🚀 ...inicializada com sucesso...');
    });

    // 4. API routes
    app.use('/api', userRoutes);
    app.use('/api', assistantRoutes);

    // 5. Swagger documentation
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // 6. Start server
    const PORT: number = parseInt(process.env.PORT || '3000', 10);
    app.listen(PORT, (): void => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error: unknown) {
    console.error('🔥 Failed to start server:', error);
    process.exit(1);
  }
}

startServer().catch((error: Error): void => {
  console.error('Unhandled promise rejection:', error);
  process.exit(1);
});