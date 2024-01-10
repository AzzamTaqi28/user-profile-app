import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@/exceptions/HttpException';
import { CreateResMsg } from '../dtos/resMsg.dto';
import { logger } from '@/config/logger';

const errorMiddleware = (
	error: HttpException,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const status: number = error.code || 500;
		let message: any[] = error.message || ['Terjadi kesalahan pada server'];

		let resMsg = new CreateResMsg();
		resMsg.code = status == 500 ? -1 : 0;

		if (!Array.isArray(message)) message = [message];
		resMsg.message = message;

		if (status === 500 && process.env.NODE_ENV === 'production') {
			resMsg.message = ['Terjadi gangguan pada Server'];
		} else {
			if (error.stack !== null) resMsg.stack = error.stack;
		}

		logger.error(
			`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`
		);
		res.status(status).json(resMsg);
	} catch (error) {
		logger.error(`[${req.method}] ${req.path} >> Error:: ${error}`);
		next(error);
	}
};

export default errorMiddleware;
