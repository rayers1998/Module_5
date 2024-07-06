//*  src/features/controllers/health.controller.js

import dotenv from 'dotenv';
dotenv.config();

// Load environment variables from a .env file into process.env
const PORT = process.env.PORT || 3004;
const ENV_NAME = process.env.ENV_NAME || 'local';

// Define a function to handle HTTP GET requests to the root URL ('/')
const helloWorld = (req, res) => res.status(200).send('Hello World!');

// Define a function to handle HTTP GET requests to the '/status' URL
const status = (req, res) => {
    res.status(200).send(`Environment '${ENV_NAME}' running on port ${PORT}`);
};

// Define a function to handle HTTP requests that result in a bad request error
const error = (req, res) => {
    res.status(400).send('400 Bad Request - One required request or parameter');
};

// Export the defined functions for use in other parts of the application
export default { helloWorld, status, error };
