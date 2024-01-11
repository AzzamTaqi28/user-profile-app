import jwt from 'jsonwebtoken';

export const generateAccessToken: any = (payload: Object) => {
	const secretKey = process.env.JWT_SECRET_KEY;
	const data = {
		sub: process.env.JWT_SUB,
		data: {
			...payload,
		},
	};

	const Generate = jwt.sign(data, secretKey, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});

	return Generate;
};
