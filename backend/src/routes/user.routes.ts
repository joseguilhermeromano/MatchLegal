import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';

const router = Router();
const userController = new UserController();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Registra um novo usuário no sistema
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - localizacao
 *               - areaDeInteresse
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome completo do usuário
 *                 example: José Romano
 *               location:
 *                 type: string
 *                 description: Localização geográfica
 *                 example: Guarulhos, São Paulo, Brasil
 *               areaOfInterest:
 *                 type: string
 *                 description: Área de interesse profissional
 *                 example: Tecnologia
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID do usuário criado
 *                 name:
 *                   type: string
 *                 location:
 *                   type: string
 *                 areaOfInterest:
 *                   type: string
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro no servidor
 */
router.post('/users', userController.createUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lista todos os usuários
 *     description: Retorna uma lista com todos os usuários cadastrados
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID do usuário
 *                   name:
 *                     type: string
 *                     description: Nome do usuário
 *                   location:
 *                     type: string
 *                     description: Localização do usuário
 *                   areaOfInterest:
 *                     type: string
 *                     description: Área de interesse do usuário
 *       500:
 *         description: Erro no servidor
 */
router.get('/users', userController.getAllUsers);

export default router;