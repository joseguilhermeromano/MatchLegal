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
 *               nome:
 *                 type: string
 *                 description: Nome completo do usuário
 *                 example: João Silva
 *               localizacao:
 *                 type: string
 *                 description: Localização geográfica
 *                 example: São Paulo, Brasil
 *               areaDeInteresse:
 *                 type: string
 *                 description: Área de interesse profissional
 *                 example: Direito Tributário
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
 *                 nome:
 *                   type: string
 *                 localizacao:
 *                   type: string
 *                 areaDeInteresse:
 *                   type: string
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro no servidor
 */
router.post('/usuarios', createUser as RequestHandler);

export default router;