 


export const development = {
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dialect: process.env.DB_DIALECT,
	logging: false,
};
export const test = {
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dialect: process.env.DB_DIALECT,
	logging: false,
};
export const production = {
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dialect: process.env.DB_DIALECT,
	logging: false,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};
