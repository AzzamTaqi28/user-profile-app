export const Config = (param: any) => {
	return {
		swaggerDefinition: {
			openapi: '3.0.3',
			info: {
				title: 'User Profile REST API',
				version: '1.0.11',
				description:
					'This is a API docs User Profile Server based on the OpenAPI 3.0 specification.',
				termsOfService: 'http://swagger.io/terms/',
				contact: {
					email: 'swagger@swagger.io',
				},
				license: {
					name: 'Apache 2.0',
					url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
				},
			},
			externalDocs: {
				description: 'Find out more about Swagger',
				url: 'http://swagger.io',
			},
			servers: [
				{
					url: `http://localhost:${param.port}${param.path}`,
				},
			],
			components: {
				securitySchemes: {
					bearerAuth: {
						type: 'http',
						name: 'Authorization',
						scheme: 'bearer',
						bearerFormat: 'JWT',
						in: 'header',
						description: 'Type into the textbox: Bearer {your JWT token}.',
					},
				},
			},
			security: [{ bearerAuth: [] }],
		},
		apis: ['./src/routes/*.ts', './src/routes/*.ts', './src/dtos/*.ts'],
	};
};
