import Sequelize from 'sequelize';
import { logger } from '@/config/logger';
import UserModel from '@/models/user.model';

type Dialect =
	| 'mysql'
	| 'postgres'
	| 'sqlite'
	| 'mariadb'
	| 'mssql'
	| 'db2'
	| 'snowflake'
	| 'oracle';

const database: string = process.env.DB_NAME || 'database';
const username: string = process.env.DB_USERNAME || 'username';
const password: string = process.env.DB_PASSWORD || 'password';
const host: string = process.env.DB_HOST || 'localhost';
const port: number = Number(process.env.DB_PORT) || 3306;
const dialect: Dialect = (process.env.DB_DIALECT as Dialect) || 'mysql';
const poolMin = Number(process.env.DB_POOL_MIN) || 0;
const poolMax = Number(process.env.DB_POOL_MAX) || 5;

const sequelize = new Sequelize.Sequelize(database, username, password, {
	host: host,
	dialect: dialect,
	port: port,
	timezone: '+07:00',
	define: {
		charset: 'utf8mb4',
		collate: 'utf8mb4_general_ci',
		underscored: true,
		freezeTableName: false,
		timestamps: true,
		paranoid: true,
	},
	pool: {
		min: poolMin,
		max: poolMax,
	},
	logQueryParameters: process.env.NODE_ENV === 'development',
	logging: (query, time) => {
		logger.info(time + 'ms' + ' ' + query);
	},
	benchmark: true,
});

sequelize.authenticate();

const DB = {
	User: UserModel(sequelize),
	sequelize,
	Sequelize,
};

export default DB;
