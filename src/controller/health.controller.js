// Import the dotenv package to load environment variables from a .env file
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables into process.env

// Load environment variables or use default values if not defined
const PORT = process.env.PORT || 3004;
const ENV_NAME = process.env.ENV_NAME || 'local';

// Define a function to handle HTTP GET requests to the root URL ('/')
const helloWorld = (req, res) => {
    res.status(200).send('Hello World!'); // Send a 'Hello World!' response with status code 200
};

// Define a function to handle HTTP GET requests to the '/status' URL
const status = (req, res) => {
    res.status(200).send(`Environment ${ENV_NAME} running on port ${PORT}`); // Send environment info with status code 200
};

// Define a function to handle HTTP requests that result in a bad request error
const error = (req, res) => {
    res.status(400).send('400 Bad Request - One required request or parameter'); // Send a 400 Bad Request error message
};

// Export the defined functions for use in other parts of the application
module.exports = { helloWorld, status, error };
