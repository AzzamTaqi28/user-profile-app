process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from './app';

// Insert Route Here

require('dotenv').config();

const app = new App([
	{
		Routes: [],
	},
]);

app.listen();
