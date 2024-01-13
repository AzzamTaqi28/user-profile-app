import cors from 'cors';
import express, { Router } from 'express';
import { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';

import bodyParser from 'body-parser';
import DB from '@/databases';
import { Routes, RouteMap } from '@/interfaces/routes.interface';
import errorMiddleware from '@/middlewares/error.middleware';
import { logger, stream } from '@config/logger';
import morgan from 'morgan';
import { Config } from 'swaggerConfig';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

class App {
	public app: express.Application;
	public port: number;
	public env: string;
	public path: string;
	public host: string;
	public apiPath: string;

	constructor(routes: RouteMap[]) {
		this.app = express();
		this.path = '/api';
		this.apiPath = process.env.API_DOCS_PATH || 'api-docs';
		this.env = process.env.NODE_ENV || 'development';
		this.port = Number(process.env.APP_PORT) || 3030;
		this.host = process.env.APP_HOST || 'localhost';

		this.initializeMiddlewares();
		this.connectToDatabase();
		this.initializeRoutes(routes);
		this.initializeSwagger();
		this.initializeErrorHandling();
		this.checkAndCreateUploadsFolder();
		this.app.use('/uploads', express.static('uploads'));
	}

	public listen() {
		this.app.listen(this.port, () => {
			logger.info(`========================================================`);
			logger.info(`============== User Profile REST API ==============`);
			logger.info(`=================== ENV: ${this.env} ===================`);
			logger.info(
				`🚀 API listening on http://${process.env.APP_HOST}:${this.port}`
			);
			logger.info(
				`🚀 API Docs listening on http://${process.env.APP_HOST}:${this.port}/${this.apiPath}`
			);
			logger.info(`========================================================\n`);
		});
	}

	private connectToDatabase() {
		DB.sequelize.sync({ force: false });
	}

	private initializeMiddlewares() {
		this.app.use(morgan(process.env.LOG_FORMAT, { stream }));
		this.app.use(
			cors({
				origin: process.env.CORS_ORIGIN || '*',
				credentials: Number(process.env.CORS_CREDENTIALS) ? true : false,
			})
		);
		this.app.use(hpp());
		this.app.use(helmet({ crossOriginResourcePolicy: false }));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(bodyParser.urlencoded({ extended: true }));
	}

	private checkAndCreateUploadsFolder() {
		const uploadDir: string = path.join(__dirname, '../uploads');

		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir);
		}
	}

	private initializeRoutes(routesMap: RouteMap[]) {
		routesMap.forEach((map: RouteMap) => {
			map.Routes.forEach((route: Routes) => {
				this.app.use(this.path, route.router);
			});
		});
	}

	private initializeSwagger() {
		const options = Config(this);
		const specs = swaggerJSDoc(options);
		this.app.use(
			`/${this.apiPath}`,
			swaggerUi.serveFiles(specs, {
				swaggerOptions: {
					docExpansion: 'none',
				},
			}),
			swaggerUi.setup(specs)
		);
	}

	private initializeErrorHandling() {
		this.app.use(errorMiddleware);
	}
}

export default App;
