import { RequestHandler, Router } from 'express';
import { createUser } from '../controllers/user.controller.js';

const router = Router();

/**
 * @route POST /usuarios
 * @desc Cria um novo usuário
 * @access Public
 * @param {string} nome - Nome do usuário
 * @param {string} localizacao - Localização do usuário
 * @param {string} areaDeInteresse - Área de interesse do usuário
 */
router.post('/usuarios', createUser as RequestHandler);

export default router;