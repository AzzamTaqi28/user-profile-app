process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from './app';
import AuthRoute from './routes/auth.route';
import ProfileRoute from './routes/profile.route';

const app = new App([
	{
		Routes: [new AuthRoute(), new ProfileRoute()],
	},
]);



app.listen();
