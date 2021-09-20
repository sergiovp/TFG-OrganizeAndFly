import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import router from './routes/routes';
import session from 'express-session';

import { storeKnexSession as store } from './dataBase/instanceDB';

// Configure DOTENV to use ENV variables.
dotenv.config();

// Instance of our application
const app = express();

// Express middleware to enable CORS with credentials from our frontend
app.use(cors({
	origin: 'http://localhost:3000',
	credentials : true
}));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Express-session middleware which also stores the session in the DB
app.use(
	session({
		secret: process.env.JWT_SECRET || '',
		resave: true,
		saveUninitialized: false,
		store,
		cookie: {
			maxAge: 365 * 24 * 60 * 60 * 1000,
		}
	}),
);

// Charge our routes
app.use(router);

export default app;
