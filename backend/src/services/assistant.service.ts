import { AssistantModel } from '../models/assistant.model.js';
import { Message } from '../interfaces/message.interface.js';

export class AssistantService {
  model: AssistantModel;
  
  constructor(sessionId: string) {
    this.model = new AssistantModel(sessionId);
  }
  
  async handleMessage(message: string): Promise<string> {
    const session = await this.model.getSession();
    let { currentStep, data } = session;
    let reply = '';

    switch (currentStep) {
      case 'start':
        reply = 'Olá! O que deseja fazer?\n1 - Cadastrar\n2 - Buscar';
        currentStep = 'awaiting_option';
        break;
      case 'awaiting_option':
        if (message === '1') {
          reply = 'Qual o nome da pessoa?';
          currentStep = 'ask_name';
        } else if (message === '2') {
          reply = 'Busca ainda não implementada. Digite 1 para cadastrar.';
        } else {
          reply = 'Opção inválida. Digite 1 ou 2.';
        }
        break;
      case 'ask_name':
        data.name = message;
        reply = 'Qual a localização da pessoa?';
        currentStep = 'ask_location';
        break;
      case 'ask_location':
        data.location = message;
        reply = 'Qual a área de interesse da pessoa?';
        currentStep = 'ask_interest';
        break;
      case 'ask_interest':
        data.interestArea = message;
        reply = `Conexão cadastrada com sucesso:\nNome: ${data.name}\nLocal: ${data.location}\nInteresse: ${data.interestArea}`;
        currentStep = 'completed';
        break;
      case 'completed':
        reply = 'Deseja cadastrar outra conexão? Digite 1 para sim, ou 2 para sair.';
        currentStep = 'awaiting_option';
        data = {};
        break;
      default:
        reply = 'Erro: estado inválido. Reiniciando...';
        currentStep = 'start';
        data = {};
        break;
    }

    await this.model.addMessage('user', message);
    await this.model.addMessage('assistant', reply);
    await this.model.saveSession(currentStep, data);

    return reply;
  }

  async getConversationHistory(): Promise<Message[]> {
    return await this.model.getMessages();
  }
}
