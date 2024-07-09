// src\controller\health.controller.js

// Get the value for PORT from the environment settings, or use 3004 if not defined.
const PORT = process.env.PORT || 3004;
// Get the value for ENV_NAME from the environment settings, or use local if not defined.
const ENV_NAME = process.env.ENV_NAME || 'local';

// Define a function to handle HTTP GET requests to the root URL ('/') which means when someone visits the main page, show them a message saying "Hello World!"
const helloWorld = (req, res) => {
    res.status(200).send('Hello World!'); // Send the 'Hello World!' response with status code 200
};

// Define a function to handle HTTP GET requests to the '/status' URL which means when someone visits the '/status' page, show them a message with the current environment 200.
const status = (req, res) => {
    res.status(200).send(`Environment ${ENV_NAME} running on port ${PORT}`); // Send environment info with status code 200
};

// Define a function to handle HTTP requests that result in a bad request error. When there's a bad request, there's a message saying "400 Bad Request - One required request or parameter".
const error = (req, res) => {
    res.status(400).send('400 Bad Request - One required request or parameter'); // Send a 400 Bad Request error message
};

// Export the defined functions for use in other parts of the application
module.exports = { helloWorld, status, error };
