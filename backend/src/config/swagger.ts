import swaggerJSDoc from 'swagger-jsdoc';
import { Express } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MatchLegal AI API REST',
      version: '1.0.0',
      description: 'Documentação com Swagger',
    },
    servers: [
      {
        url: process.env.API_BASE_URL,
        description: 'MatchLegal AI API',
      },
    ],
  },
  apis: [
    'src/routes/*.routes.ts',
    'src/controllers/*.controller.js',
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express): void {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const swaggerFilePath = path.join(__dirname, '../../api/swagger.json');

  app.use('/swagger.json', (_, res) => {
    if (fs.existsSync(swaggerFilePath)) {
      res.sendFile(swaggerFilePath);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
    }
  });

  app.use('/docs', (_, res) => {
    res.sendFile(path.join(__dirname, '../../../api', 'index.html'));
  });
}
