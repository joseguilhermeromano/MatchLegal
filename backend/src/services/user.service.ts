import { getRepository } from 'fireorm';
import { User } from '../models/user.model.js';
import { CreateUserRequestBody } from '../interfaces/createUserRequestBody.interface.js';

export class UserService {
  private userRepository = getRepository(User);

  async createUser(userData: CreateUserRequestBody): Promise<User> {
    if (!userData.name || !userData.location || !userData.areaOfInterest) {
      throw new Error('Campos obrigatórios ausentes.');
    }

    return await this.userRepository.create(userData);
  }
}