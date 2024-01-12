import { Request, Response, NextFunction } from 'express';

import { HttpException } from '@/exceptions/HttpException';
import UserService from '@/services/user.service';
import { CreateResMsg } from '@/dtos/resMsg.dto';
import { ResponseMessage } from '@/interfaces/responseMessage.interface';
import { User } from '@/interfaces/user.interface';
import multer from 'multer';
import moment from 'moment';
import { UpdateUserDto } from '@/dtos/user.dto';
import { validate } from 'class-validator';

class ProfileController {
	public UserService = new UserService();

	public detailUser = async (req: any, res: Response, next: NextFunction) => {
		try {
			let resMsg: ResponseMessage = new CreateResMsg();
			const user = req.user;

			const userDetail = await this.UserService.findUserById(user.id);

			resMsg.code = 1;
			resMsg.data = userDetail;
			resMsg.message = ['Success'];
			res.status(200).json(resMsg);
		} catch (error) {
			next(error);
		}
	};

	public updateUser = async (req: any, res: Response, next: NextFunction) => {
		try {
			let resMsg: ResponseMessage = new CreateResMsg();
			const picture = req.file;
			const updateUserDto = new UpdateUserDto();
			updateUserDto.name = req.body?.name;
			updateUserDto.email = req.body?.email;
			updateUserDto.phone = req.body?.phone;
			updateUserDto.password = req.body?.password;
			updateUserDto.image = picture?.filename;

			const validationErrors = await validate(updateUserDto);

			if (validationErrors.length > 0) {
				throw new HttpException(400, 'Validation Error', validationErrors);
			}

			const data = {
				id: req.user.id,
				name: updateUserDto.name,
				email: updateUserDto.email,
				phone: updateUserDto.phone,
				password: updateUserDto.password,
				imageName: updateUserDto?.image,
				imageExtension: picture?.mimetype,
			};

			await this.UserService.updateUser(data);

			resMsg.code = 1;
			resMsg.message = ['Success Update User'];
			res.status(200).json(resMsg);
		} catch (error) {
			next(error);
		}
	};
}

export default ProfileController;
