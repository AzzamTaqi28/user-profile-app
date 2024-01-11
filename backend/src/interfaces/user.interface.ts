import { BaseModel } from './base-model.interface';

export interface User extends BaseModel {
	name: string;
	email: string;
	phone: string;
	password: string;
	imageName?: string;
	imageExtension?: string;
}
