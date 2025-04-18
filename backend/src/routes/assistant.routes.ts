import { RequestHandler, Router } from 'express';
import { handleAssistantMessage, getConversationHistory } from '../controllers/assistant.controller.js';

const router = Router();

/**
 * @swagger
 * /api/assistant:
 *   post:
 *     summary: Envia mensagem para o assistente virtual
 *     description: Processa uma mensagem do usuário e retorna a resposta do assistente
 *     tags: [Assistant]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionId:
 *                 type: string
 *                 description: ID da sessão
 *               message:
 *                 type: string
 *                 description: Mensagem do usuário
 *             example:
 *               sessionId: "AAAAMMDDHHMMSS"
 *               message: "Olá"
 *     responses:
 *       200:
 *         description: Resposta do assistente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 */
router.post('/assistant', handleAssistantMessage);

/**
 * @swagger
 * /api/assistant/{sessionId}:
 *   get:
 *     summary: Retorna o histórico de conversa
 *     description: Retorna todas as mensagens trocadas em uma sessão específica
 *     tags: [Assistant]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da sessão
 *     responses:
 *       200:
 *         description: Histórico de conversação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       from:
 *                         type: string
 *                         example: "user"
 *                       text:
 *                         type: string
 *                         example: "Olá"
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-08-01T12:00:00Z"
 *       404:
 *         description: Sessão não encontrada
 *       500:
 *         description: Erro no servidor
 */
router.get('/assistant/:sessionId', getConversationHistory as RequestHandler);

export default router;