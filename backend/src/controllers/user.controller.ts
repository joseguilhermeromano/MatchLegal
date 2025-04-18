import { RequestHandler } from 'express';
import { getRepository } from 'fireorm';
import { User } from '../models/user.model.js';
import { CreateUserRequestBody } from '../interfaces/createUserRequestBody.interface.js';

const userRepository = getRepository(User);

export const createUser: RequestHandler = async (req, res) => {
  try {
    const { name, location, areaOfInterest } = req.body as CreateUserRequestBody;

    if (!name || !location || !areaOfInterest) {
      res.status(400).json({ message: 'Campos obrigatórios ausentes.' });
      return;
    }

    const newUser = await userRepository.create({
      name,
      location,
      areaOfInterest,
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