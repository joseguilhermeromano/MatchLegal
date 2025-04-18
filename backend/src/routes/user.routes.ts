import { RequestHandler, Router } from 'express';
import { createUser } from '../controllers/user.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /api/usuarios:
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
router.post('/users', createUser as RequestHandler);

export default router;