import { Request, Response, NextFunction } from 'express';
import { AssistantService } from '../services/assistant.service.js';

export const handleAssistantMessage = async (req: Request, res: Response): Promise<void> => {
  const { sessionId, message } = req.body;

  if (!sessionId || !message) {
    res.status(400).json({ error: 'sessionId e message são obrigatórios' });
    return;
  }

  try {
    const service = new AssistantService(sessionId);
    const reply = await service.handleMessage(message);
    res.status(200).json({ reply });
  } catch (error) {
    console.error('[ERRO ASSISTENTE]', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const getConversationHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { sessionId } = req.params;

  if (!sessionId) {
    res.status(400).json({ error: 'sessionId é obrigatório' });
    return;
  }

  try {
    const service = new AssistantService(sessionId);
    const messages = await service.getConversationHistory();
    res.status(200).json({ messages });
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    next(error); 
  }
};
