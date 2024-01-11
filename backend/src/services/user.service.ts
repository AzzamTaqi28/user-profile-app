import DB from '@/databases';
import { User } from '@/interfaces/user.interface';

import { HttpException } from '@/exceptions/HttpException';
import bcrypt from 'bcrypt';
import { generateAccessToken } from '@/utils/utils.utils';

import { Op } from 'sequelize';

class UserService {
	public User = DB.User;

	public async findUser(username: any): Promise<User> {
		try {
			const config = {
				where: {
					[Op.or]: {
						email: username,
						phone: username,
					},
				},
			};
			const user: User = await this.User.findOne(config);
			return user;
		} catch (error) {
			throw error;
		}
	}

	public async registerUser(userData: User): Promise<User> {
		try {
			const isEmailExist: number = await this.User.count({
				where: {
					email: userData.email,
				},
			});

			const isPhoneExist: number = await this.User.count({
				where: {
					phone: userData.phone,
				},
			});

			if (isEmailExist > 0) {
				throw new HttpException(409, `Email ${userData.email} already exists`);
			}

			if (isPhoneExist > 0) {
				throw new HttpException(409, `Phone ${userData.phone} already exists`);
			}
			userData.password = await bcrypt.hash(userData.password, 10);
			const user: User = await this.User.create(userData);
			return user;
		} catch (error) {
			throw error;
		}
	}

	public async loginUser(email: string, password: string): Promise<any> {
		try {
			const user: User = await this.User.findOne({
				where: {
					email: email,
				},
			});

			console.log(user);

			if (!user) {
				throw new HttpException(409, `Email or password is wrong`);
			}

			const isPasswordMatch = await bcrypt.compare(password, user.password);

			if (!isPasswordMatch) {
				throw new HttpException(409, `Email or password is wrong`);
			}

			const payload = {
				id: user.id,
				name: user.name,
				email: user.email,
				phone: user.phone,
			};

			const token = generateAccessToken(payload);
			
			const result = {
				token: token,
				user: payload
			}

			return result;
		} catch (error) {
			throw error;
		}
	}
}

export default UserService;
