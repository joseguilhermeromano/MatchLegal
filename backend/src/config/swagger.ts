import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

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
        url: 'http://localhost:3000/api',
        description: "MatchLegal AI API"
      },
    ],
  },
  apis: ['src/routes/*.routes.ts', './src/controllers/*.controller.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
