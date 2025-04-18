import { RequestHandler } from 'express';
import { UserService } from '../services/user.service.js';
import { CreateUserRequestBody } from '../interfaces/createUserRequestBody.interface.js';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  createUser: RequestHandler = async (req, res) => {
    try {
      const userData = req.body as CreateUserRequestBody;
      const newUser = await this.userService.createUser(userData);

      res.status(201).json({ 
        message: 'Usuário criado com sucesso!', 
        user: newUser 
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      res.status(500).json({ 
        message: 'Erro ao criar usuário', 
        error: errorMessage 
      });
    }
  };
}