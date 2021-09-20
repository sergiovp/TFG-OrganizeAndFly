import app from './app';
import dotenv from 'dotenv';

// Configure DOTENV to use ENV variables.
dotenv.config();

// Set port
const PORT = process.env.BACK_PORT || 7777;

// Start the server
app.listen(PORT, () => {
    console.log(`Express with Typescript! http://localhost:${PORT}`);
});
