import { Request, Response, NextFunction } from 'express';

import { HttpException } from '@/exceptions/HttpException';
import UserService from '@/services/user.service';
import { CreateResMsg } from '@/dtos/resMsg.dto';
import { ResponseMessage } from '@/interfaces/responseMessage.interface';
import { User } from '@/interfaces/user.interface';

class AuthController {
	public UserService = new UserService();

	public register = async (req: Request, res: Response, next: NextFunction) => {
		try {
			let resMsg: ResponseMessage = new CreateResMsg();
			const body: any = req.body;

			const userData: User = {
				name: body.name,
				email: body.email,
				phone: body.phone,
				password: body.password,
			};

			const user = await this.UserService.registerUser(userData);
			resMsg.code = 1;
			resMsg.data = user;
			resMsg.message = ['Register user success'];
			res.status(200).json(resMsg);
		} catch (error) {
			next(error);
		}
	};

	public login = async (req: Request, res: Response, next: NextFunction) => {
		try {
			let resMsg: ResponseMessage = new CreateResMsg();
			const body: any = req.body;

			const authenticate = await this.UserService.loginUser(
				body.email,
				body.password
			);

			resMsg.code = 1;
			resMsg.data = authenticate;
			resMsg.message = ['Successfully login'];
			res.status(200).json(resMsg);
		} catch (error) {
			next(error);
		}
	};
}

export default AuthController;
