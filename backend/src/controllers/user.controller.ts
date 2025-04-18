import { RequestHandler } from 'express';
import { getRepository } from 'fireorm';
import { User } from '../models/user.model.js';
import { CreateUserRequestBody } from '../interfaces/createUserRequestBody.interface.js';

const userRepository = getRepository(User);

export const createUser: RequestHandler = async (req, res) => {
  try {
    const { nome, localizacao, areaDeInteresse } = req.body as CreateUserRequestBody;

    if (!nome || !localizacao || !areaDeInteresse) {
      res.status(400).json({ message: 'Campos obrigatórios ausentes.' });
      return;
    }

    const newUser = await userRepository.create({
      nome,
      localizacao,
      areaDeInteresse,
    });

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