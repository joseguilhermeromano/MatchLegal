import { RequestHandler, Router } from 'express';
import { handleAssistantMessage, getConversationHistory } from '../controllers/assistant.controller.js';

const router = Router();

/**
 * @route POST /assistant
 * @desc Envia mensagem para o assistente virtual
 * @access Public
 * @param {string} sessionId
 * @param {string} message
 */
router.post('/assistant', handleAssistantMessage);

/**
 * @route GET /assistant/:sessionId
 * @desc Retorna o histórico de conversa
 * @access Public
 * @param {string} sessionId - ID da sessão para recuperar o histórico de mensagens
 */
router.get('/assistant/:sessionId', getConversationHistory as RequestHandler);

export default router;
