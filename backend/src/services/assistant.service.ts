import { AssistantModel } from '../models/assistant.model.js';
import { Message } from '../interfaces/message.interface.js';
import { UserService } from './user.service.js';
import { CreateUserRequestBody } from '../interfaces/createUserRequestBody.interface.js';

enum ConversationStep {
  START = 'start',
  AWAITING_OPTION = 'awaiting_option',
  ASK_NAME = 'ask_name',
  ASK_LOCATION = 'ask_location',
  ASK_INTEREST = 'ask_interest',
  COMPLETED = 'completed'
}

const MESSAGES = {
  WELCOME: 'Olá! O que deseja fazer?\n1 - Cadastrar\n2 - Buscar',
  INVALID_OPTION: 'Opção inválida. Digite 1 ou 2.',
  ASK_NAME: 'Qual o nome da pessoa?',
  ASK_LOCATION: 'Qual a localização da pessoa?',
  ASK_INTEREST: 'Qual a área de interesse da pessoa?',
  SEARCH_NOT_IMPLEMENTED: 'Busca ainda não implementada. Digite 1 para cadastrar.',
  SUCCESS: (user: CreateUserRequestBody):string => 
    `✅ Conexão cadastrada com sucesso:\n\n👤 Nome: ${user.name}\n📍 Local: ${user.location}\n🎯 Interesse: ${user.areaOfInterest}`,
  ERROR: '❌ Ocorreu um erro ao cadastrar a conexão. Por favor, tente novamente.',
  COMPLETED: 'Deseja cadastrar outra conexão? Digite 1 para sim, ou 2 para sair.',
  INVALID_STATE: 'Erro: estado inválido. Reiniciando...'
};

export class AssistantService {
  private model: AssistantModel;
  
  constructor(sessionId: string) {
    this.model = new AssistantModel(sessionId);
  }
  
  private async updateSession(currentStep: string, data: CreateUserRequestBody, reply: string, userMessage: string): Promise<void> {
    await this.model.addMessage('user', userMessage);
    await this.model.addMessage('assistant', reply);
    await this.model.saveSession(currentStep, data);
  }

  async handleMessage(message: string): Promise<string> {
    const session = await this.model.getSession();
    let { currentStep, data } = session;
    let reply = '';
    const trimmedMessage = message.trim();

    switch (currentStep) {
      case ConversationStep.START:
        reply = MESSAGES.WELCOME;
        currentStep = ConversationStep.AWAITING_OPTION;
        break;

      case ConversationStep.AWAITING_OPTION:
        if (trimmedMessage === '1') {
          reply = MESSAGES.ASK_NAME;
          currentStep = ConversationStep.ASK_NAME;
        } else if (trimmedMessage === '2') {
          reply = MESSAGES.SEARCH_NOT_IMPLEMENTED;
        } else {
          reply = MESSAGES.INVALID_OPTION;
        }
        break;

      case ConversationStep.ASK_NAME:
        data.name = trimmedMessage;
        reply = MESSAGES.ASK_LOCATION;
        currentStep = ConversationStep.ASK_LOCATION;
        break;

      case ConversationStep.ASK_LOCATION:
        data.location = trimmedMessage;
        reply = MESSAGES.ASK_INTEREST;
        currentStep = ConversationStep.ASK_INTEREST;
        break;

      case ConversationStep.ASK_INTEREST:
        data.areaOfInterest = trimmedMessage;
        
        try {
          const userService = new UserService();
          const newUser = await userService.createUser({
            name: data.name,
            location: data.location,
            areaOfInterest: data.areaOfInterest
          });
          
          reply = MESSAGES.SUCCESS(newUser);
        } catch (error) {
          console.error('Erro ao criar usuário:', error);
          reply = MESSAGES.ERROR;
          // Não avançamos para completed em caso de erro
          await this.updateSession(currentStep, data as CreateUserRequestBody, reply, message);
          return reply;
        }
        
        currentStep = ConversationStep.COMPLETED;
        break;

      case ConversationStep.COMPLETED:
        reply = MESSAGES.COMPLETED;
        currentStep = ConversationStep.AWAITING_OPTION;
        data = {};
        break;

      default:
        reply = MESSAGES.INVALID_STATE;
        currentStep = ConversationStep.START;
        data = {};
        break;
    }

    await this.updateSession(currentStep, data as CreateUserRequestBody, reply, message);
    return reply;
  }

  async getConversationHistory(): Promise<Message[]> {
    return await this.model.getMessages();
  }
}