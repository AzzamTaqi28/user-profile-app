import DB from '@/databases';
import { User } from '@/interfaces/user.interface';

import { HttpException } from '@/exceptions/HttpException';
import bcrypt from 'bcrypt';
import { generateAccessToken } from '@/utils/utils.utils';

import { Op } from 'sequelize';

class UserService {
	public User = DB.User;

	public async findUserById(id: number): Promise<User> {
		try {
			const user: User = await this.User.findByPk(id, {
				attributes: { exclude: ['password'] },
			});
			return user;
		} catch (error) {
			throw error;
		}
	}

	public async updateUser(data: any): Promise<any> {
		try {
			const user = await this.User.count({
				where: { id: data.id },
			});

			if (!user) {
				throw new HttpException(400, 'User not found');
			}

			//get the value from data that is not empty
			const updateData: any = {};
			Object.keys(data).forEach((key) => {
				if (data[key]) {
					if (key === 'password') {
						const salt = bcrypt.genSaltSync(10);
						const hash = bcrypt.hashSync(data[key], salt);
						updateData[key] = hash;
					}
					updateData[key] = data[key];
				}
			});
			const isEmailExist: number = await this.User.count({
				where: {
					email: updateData.email,
					id: {
						[Op.ne]: data.id,
					},
				},
			});

			const isPhoneExist: number = await this.User.count({
				where: {
					phone: updateData.phone,
					id: {
						[Op.ne]: data.id,
					},
				},
			});

			if (isEmailExist > 0) {
				throw new HttpException(409, `Email ${updateData.email} already used`);
			}

			if (isPhoneExist > 0) {
				throw new HttpException(409, `Phone ${updateData.phone} already used`);
			}

			const updated = await this.User.update(updateData, {
				where: { id: data.id },
			});

			if (!updated) {
				throw new HttpException(500, 'Failed to update user');
			}

			return updated;
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
				user: payload,
			};

			return result;
		} catch (error) {
			throw error;
		}
	}
}

export default UserService;
