import { Router } from 'express';
import { Routes } from '@/interfaces/routes.interface';
import AuthController from '@/controllers/auth.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { LoginUserDto, RegisterUserDto } from '@/dtos/user.dto';
import authMiddleware from '@/middlewares/auth.middleware';

class AuthRoute implements Routes {
	public router = Router();
	public AuthController = new AuthController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		/**
		 * @openapi
		 * '/auth/register':
		 *   post:
		 *     tags:
		 *     - Auth
		 *     requestBody:
		 *      required: true
		 *      content:
		 *        application/json:
		 *           schema:
		 *             $ref: '#/components/schemas/RegisterUserSchemas'
		 *     responses:
		 *       200:
		 *         description: Success.
		 */
		this.router.post(
			`/register`,
			validationMiddleware(RegisterUserDto, 'body'),
			this.AuthController.register
		);

		/**
		 * @openapi
		 * '/auth/login':
		 *   post:
		 *     tags:
		 *     - Auth
		 *     requestBody:
		 *      required: true
		 *      content:
		 *        application/json:
		 *           schema:
		 *             $ref: '#/components/schemas/LoginUserSchemas'
		 *     responses:
		 *       200:
		 *         description: Success.
		 */
		this.router.post(
			`/login`,
			validationMiddleware(LoginUserDto, 'body'),
			this.AuthController.login
		);

		this.router.use('/auth', this.router);
	}
}

export default AuthRoute;
