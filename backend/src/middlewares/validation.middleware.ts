import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { HttpException } from '@/exceptions/HttpException';

const validationMiddleware = (
	type: any,
	value: string | 'body' | 'query' | 'params' = 'body',
	skipMissingProperties = false,
	whitelist = true,
	forbidNonWhitelisted = true
): RequestHandler => {
	return async (req, res, next) => {
		try {
			const instance = plainToInstance(type, req[value]);
			const errors = await validate(instance, {
				skipMissingProperties,
				whitelist,
				forbidNonWhitelisted,
			});

			if (errors.length > 0) {
				const message: { [key: string]: string } = {};
				errors.forEach((error: ValidationError) => {
					Object.entries(error.constraints || {}).forEach(([key, value]) => {
						message[error.property] = value;
					});
				});

				next(new HttpException(400, message));
			} else {
				next();
			}
		} catch (error) {
			next(new HttpException(500, 'Internal Server Error'));
		}
	};
};

export default validationMiddleware;
