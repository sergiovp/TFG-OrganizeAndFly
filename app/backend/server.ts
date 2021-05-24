import app from './app';

// Set port
const PORT = 7777;

// Start the server
app.listen(PORT, () => {
    console.log(`Express with Typescript! http://localhost:${PORT}`);
});
