import express from 'express';
import cors from 'cors';
import router from './routes/routes';

// Instance of our application
const app = express();

// Set port
const PORT: number = 7777;

// Express middleware to enable CORS with credentials from our frontend
app.use(cors({
	origin: 'http://localhost:3000',
	credentials : true
}));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Charge our routes
app.use(router);

// Start the server
app.listen(PORT, () => {
    console.log(`Express with Typescript! http://localhost:${PORT}`);
});
