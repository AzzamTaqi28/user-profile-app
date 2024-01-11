import { Dialect } from 'sequelize/types';

interface SequelizeConfig {
	username: string;
	password: string;
	database: string;
	host: string;
	dialect: Dialect;
	[key: string]: any; // Additional Sequelize options
}

const config: SequelizeConfig = {
	username: process.env.DB_USERNAME || '',
	password: process.env.DB_PASSWORD || '',
	database: process.env.DB_NAME || '',
	host: process.env.DB_HOST || 'localhost',
	dialect: 'mysql',
};

export default config;
