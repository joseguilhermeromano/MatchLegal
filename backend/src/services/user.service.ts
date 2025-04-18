import { getRepository } from 'fireorm';
import { User } from '../models/user.model.js';
import { CreateUserRequestBody } from '../interfaces/createUserRequestBody.interface.js';
import { firestore } from '../config/firebase.js';

export class UserService {
  private userRepository = getRepository(User);

  async createUser(userData: CreateUserRequestBody): Promise<User> {
    if (!userData.name || !userData.location || !userData.areaOfInterest) {
      throw new Error('Campos obrigatórios ausentes.');
    }

    return await this.userRepository.create(userData);
  }

  async getAllUsers(): Promise<CreateUserRequestBody[]> {
    try {
      const snapshot = await firestore.collection('users').get();
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          name: data.name,
          location: data.location,
          areaOfInterest: data.areaOfInterest
        };
      });
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw new Error('Falha ao recuperar usuários');
    }
  }
}