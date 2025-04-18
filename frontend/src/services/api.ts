import axios from 'axios';
import { getSessionId } from '../utils/session';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export interface ConversationInterface {
  from: string;
  text: string;
  timestamp: string;
}

interface AssistantResponse {
  reply: string;
}

export const speakAssistant = (message: string) => {
  const sessionId = getSessionId();
  return api.post<AssistantResponse>('/assistant', { sessionId, message });
};

export const historyChat = () => {
  const sessionId = getSessionId();
  return api.get<ConversationInterface[]>('/assistant', { params: { sessionId } });
};

export default api;