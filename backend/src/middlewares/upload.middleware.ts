import multer from 'multer';
import moment from 'moment';
import path from 'path';
import { Request, Response, NextFunction } from 'express';
import { HttpException } from '@/exceptions/HttpException';

const uploadPath = path.join(__dirname, '../../uploads');

const multerStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadPath);
	},
	filename: (req, file, cb) => {
		cb(null, `PP${moment().format('DDMMYYmmss')}_${file.originalname}`);
	},
});

const imageFieldsMimeType = ['image/jpeg', 'image/png', 'image/jpg'];

const multerFilter = (req, file, cb) => {
	if (imageFieldsMimeType.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new HttpException(400, 'Only jpg, jpeg, png'));
	}
};

export const uploadMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const upload = multer({
		storage: multerStorage,
		fileFilter: multerFilter,
	}).single('image');

	upload(req, res, (err: any) => {
		if (err) {
			return next(err); // Pass the error to the next middleware (error middleware)
		}
		next();
	});
};
