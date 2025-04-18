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
    SEARCH_LOCATION = 'search_location',
    SEARCH_INTEREST = 'search_interest',
    COMPLETED = 'completed'
  }

const MESSAGES = {
  WELCOME: 'Olá! Seja-bem vindo!! \nSou o <b>Leo</b>, e minha missão é ajudar você a encontrar a conexão ideal. \n\nO que deseja fazer?\n\n1 - Cadastrar\n2 - Buscar Conexões',
  INVALID_OPTION: 'Opção inválida. Digite 1 ou 2.',
  ASK_NAME: 'Qual o nome da pessoa? (ex: José Romano)',
  ASK_LOCATION: 'Qual a localização da pessoa? (digitar assim: São Paulo, SP, Brasil)',
  ASK_INTEREST: 'Qual a área de interesse da pessoa? (ex: Sistemas web)',
  ASK_SEARCH_LOCATION: 'Em qual localização você está buscando conexões?',
  ASK_SEARCH_INTEREST: 'Qual área de interesse você deseja buscar?',
  SEARCH_RESULTS: (matches: Array<{user: CreateUserRequestBody, score: number}>): string => {
    if (matches.length === 0) {
      return 'Não encontrei conexões que correspondam à sua busca. Deseja tentar novamente? Digite 1 para buscar ou 2 para sair.';
    }
    
    let response = '🔍 Aqui estão as conexões que encontrei:\n\n';
    matches.forEach((match, index) => {
      response += `👉 Conexão ${index + 1}\n`;
      response += `👤 Nome: ${match.user.name}\n`;
      response += `📍 Local: ${match.user.location}\n`;
      response += `🎯 Interesse: ${match.user.areaOfInterest}\n`;
      response += `📊 Compatibilidade: ${Math.round(match.score * 100)}%\n\n`;
    });
    response += 'Deseja buscar novamente? Digite 1 para sim ou 2 para sair.';
    return response;
  },
  SEARCH_NOT_IMPLEMENTED: 'Busca ainda não implementada. Digite 1 para cadastrar.',
  SUCCESS: (user: CreateUserRequestBody):string => 
    `✅ Conexão cadastrada com sucesso:\n\n👤 Nome: ${user.name}\n📍 Local: ${user.location}\n🎯 Interesse: ${user.areaOfInterest}`,
  ERROR: '❌ Ocorreu um erro ao cadastrar a conexão. Por favor, tente novamente.',
  COMPLETED: 'Deseja cadastrar outra conexão? Digite 1 para sim, ou 2 para sair.',
  INVALID_STATE: 'Erro: estado inválido. Reiniciando...'
};

export class AssistantService {
  private model: AssistantModel;
  private userService: UserService;
  
  constructor(sessionId: string) {
    this.model = new AssistantModel(sessionId);
    this.userService = new UserService();
  }
  
  private async updateSession(currentStep: string, data: CreateUserRequestBody, reply: string, userMessage: string): Promise<void> {
    await this.model.addMessage('user', userMessage);
    await this.model.addMessage('assistant', reply);
    await this.model.saveSession(currentStep, data);
  }

  private calculateMatchScore(
    user: CreateUserRequestBody, 
    searchData: {location: string, areaOfInterest: string}
  ): number {
    let score = 0;
    
    // 1. Comparação de área de interesse (50% do score)
    if (user.areaOfInterest.toLowerCase() === searchData.areaOfInterest.toLowerCase()) {
      score += 0.5; // 100% do critério interesse
    } else if (user.areaOfInterest.toLowerCase().includes(searchData.areaOfInterest.toLowerCase())) {
      score += 0.3; // 60% do critério interesse (match parcial)
    } else if (searchData.areaOfInterest.toLowerCase().includes(user.areaOfInterest.toLowerCase())) {
      score += 0.2; // 40% do critério interesse (match inverso parcial)
    }
    
    // 2. Comparação de localização (50% do score)
    const userLocationParts = user.location.split(',').map(part => part.trim().toLowerCase());
    const searchLocationParts = searchData.location.split(',').map(part => part.trim().toLowerCase());
    
    // Quanto mais específico o match, maior a pontuação
    if (userLocationParts.length >= 3 && searchLocationParts.length >= 3) {
      // Compara cidade, estado e país (formato completo)
      if (userLocationParts[0] === searchLocationParts[0] && 
          userLocationParts[1] === searchLocationParts[1] && 
          userLocationParts[2] === searchLocationParts[2]) {
        score += 0.5; // 100% do critério localização (match completo)
      } else if (userLocationParts[1] === searchLocationParts[1] && 
                 userLocationParts[2] === searchLocationParts[2]) {
        score += 0.4; // 80% do critério localização (mesmo estado e país)
      } else if (userLocationParts[2] === searchLocationParts[2]) {
        score += 0.3; // 60% do critério localização (mesmo país)
      }
    } else if (userLocationParts.length >= 2 && searchLocationParts.length >= 2) {
      // Compara estado e país (formato reduzido)
      if (userLocationParts[1] === searchLocationParts[1] && 
          userLocationParts[0] === searchLocationParts[0]) {
        score += 0.4; // 80% do critério localização
      } else if (userLocationParts[1] === searchLocationParts[1]) {
        score += 0.3; // 60% do critério localização
      }
    } else {
      // Comparação simples (quando não tem formato específico)
      if (user.location.toLowerCase().includes(searchData.location.toLowerCase()) || 
          searchData.location.toLowerCase().includes(user.location.toLowerCase())) {
        score += 0.2; // 40% do critério localização
      }
    }
    
    return score;
  }

  private async findBestMatches(location: string, areaOfInterest: string): Promise<Array<{user: CreateUserRequestBody, score: number}>> {
    const allUsers = await this.userService.getAllUsers();
    const matches = allUsers.map(user => ({
      user,
      score: this.calculateMatchScore(user, {location, areaOfInterest})
    }))
    .filter(match => match.score > 0) // Filtra apenas matches com algum score
    .sort((a, b) => b.score - a.score) // Ordena do maior para o menor
    .slice(0, 3); // Pega apenas os 3 melhores
    
    return matches;
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
          data = {};
        } else if (trimmedMessage === '2') {
          reply = MESSAGES.ASK_SEARCH_LOCATION;
          currentStep = ConversationStep.SEARCH_LOCATION;
          data = {};
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
          const newUser = await this.userService.createUser({
            name: data.name,
            location: data.location,
            areaOfInterest: data.areaOfInterest
          });
          
          reply = MESSAGES.SUCCESS(newUser);
          currentStep = ConversationStep.COMPLETED;
        } catch (error) {
          console.error('Erro ao criar usuário:', error);
          reply = MESSAGES.ERROR;
        }
        break;

      case ConversationStep.SEARCH_LOCATION:
        data.searchLocation = trimmedMessage;
        reply = MESSAGES.ASK_SEARCH_INTEREST;
        currentStep = ConversationStep.SEARCH_INTEREST;
        break;

      case ConversationStep.SEARCH_INTEREST:
        data.searchInterest = trimmedMessage;
        try {
          const matches = await this.findBestMatches(data.searchLocation, data.searchInterest);
          reply = MESSAGES.SEARCH_RESULTS(matches);
          currentStep = ConversationStep.COMPLETED;
        } catch (error) {
          console.error('Erro ao buscar conexões:', error);
          reply = 'Ocorreu um erro ao buscar conexões. Deseja tentar novamente? Digite 1 para sim ou 2 para sair.';
          currentStep = ConversationStep.AWAITING_OPTION;
        }
        break;

      case ConversationStep.COMPLETED:
        if (trimmedMessage === '1') {
          reply = MESSAGES.WELCOME;
          currentStep = ConversationStep.AWAITING_OPTION;
          data = {};
        } else if (trimmedMessage === '2') {
          reply = 'Até logo! Se precisar de algo mais, é só chamar.';
          currentStep = ConversationStep.START;
          data = {};
        } else {
          reply = MESSAGES.INVALID_OPTION;
        }
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