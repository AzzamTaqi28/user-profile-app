import { NextFunction, Request, Response } from 'express';
import DB from '@/databases';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: any, res: Response, next: NextFunction) => {
	try {
		const User = DB.User;
		let decodedToken = null;
		const secretKey = process.env.JWT_SECRET_KEY;
		const authHeader = req.headers['authorization'];
		const accessToken = authHeader && authHeader.split(' ')[1];
		const ERR = {
			401: {
				statusCode: 401,
				send: { code: 0, message: 'Unauthorized', data: null },
			},
			403: {
				statusCode: 403,
				send: { code: 0, message: 'Forbidden', data: null },
			},
		};

		if (!accessToken) throw ERR[401];
		else decodedToken = jwt.decode(accessToken);

		if (decodedToken != null || decodedToken.sub !== process.env.JWT_SUB) {
			jwt.verify(accessToken, secretKey, (error: any, result: any) => {
				process.nextTick(async () => {
					try {
						if (error) return res.status(ERR[403].statusCode).send(ERR[403].send);
						const findUser: any = await User.findOne({
							where: {
								id: decodedToken.data.id,
								deletedAt: null,
							},
							attributes: [
								'id',
								'email',
								'name',
								'phone',
								'imageName',
								'imageExtension',
							],
						});

						if (findUser === null || findUser.id !== decodedToken.data.id)
							return res.status(ERR[403].statusCode).send(ERR[403].send);
						req.user = findUser;
						next();
					} catch (error) {
						res.status(500).send({
							code: 0,
							message: 'Internal Server Error',
							data: null,
							stack: error,
						});
					}
				});
			});
		} else return res.status(ERR[403].statusCode).send(ERR[403].send);
	} catch (error) {
		return res.status(error.statusCode).send(error.send);
	}
};

export default authMiddleware;
