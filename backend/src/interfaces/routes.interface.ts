import { Router } from 'express';

export interface Routes {
	path?: string;
	router: Router;
}

export interface RouteMap {
	Routes: Routes[];
}
