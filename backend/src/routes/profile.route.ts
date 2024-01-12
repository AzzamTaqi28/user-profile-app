import { Router } from 'express';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import ProfileController from '@/controllers/profile.controller';
import multer from 'multer';
import moment from 'moment';
import { HttpException } from '@/exceptions/HttpException';
import errorMiddleware from '@/middlewares/error.middleware';
import path from 'path';
import { uploadMiddleware } from '@/middlewares/upload.middleware';


class ProfileRoute implements Routes {
	public router = Router();
	public ProfileController = new ProfileController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		/**
		 * @openapi
		 * '/profile':
		 *   get:
		 *     tags:
		 *     - Profile
		 *     responses:
		 *       200:
		 *         description: Success.
		 */
		this.router.get(`/`, this.ProfileController.detailUser);

		/**
		 * @openapi
		 * '/profile':
		 *   post:
		 *     tags:
		 *     - Profile
		 *     requestBody:
		 *      content:
		 *        multipart/form-data:
		 *           schema:
		 *             $ref: '#/components/schemas/UpdateUserSchemas'
		 *     responses:
		 *       200:
		 *         description: Success.
		 */
		this.router.post(`/`, uploadMiddleware, this.ProfileController.updateUser);

		this.router.use('/profile', authMiddleware, this.router);
	}
}

export default ProfileRoute;
