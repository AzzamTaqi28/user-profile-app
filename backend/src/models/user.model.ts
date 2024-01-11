'use strict';

import { Model, Sequelize, DataTypes } from 'sequelize';
import { User } from '@/interfaces/user.interface';

export class UserModel extends Model<User> implements User {
	public id: number;
	public name: string;
	public email: string;
	public phone: string;
	public password: string;
	public imageName: string;
	public imageExtension: string;
	public readonly createdAt!: string;
	public readonly updatedAt!: string;
	public readonly deletedAt!: string;
}

export default function (sequelize: Sequelize): typeof UserModel {
	UserModel.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			phone: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			imageName: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			imageExtension: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: true,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: true,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				onUpdate: Sequelize.literal('CURRENT_TIMESTAMP') as any,
			},
			deletedAt: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: 'User',
		}
	);

	return UserModel;
}
