import { Router } from 'express';

export interface Routes {
	router: Router;
}

export interface RouteMap {
	Routes: Routes[];
}
