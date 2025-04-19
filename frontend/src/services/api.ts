import axios from 'axios';
import { getSessionId } from '../utils/session';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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