import dotenv from "dotenv";

// Load environment variables from a .env file into process.env
dotenv.config();

// Set the port number from an environment variable or default to 3004
const PORT = process.env.PORT || 3004;

// Set the environment name from an environment variable or default to 'local'
const ENV_NAME = process.env.ENV_NAME || 'local';

// Define a function to handle HTTP GET requests to the root URL ('/') 
// and respond with a 'Hello World' message
const helloWorld = (req, res) => res.status(200).send('Hello World!!');

// Define a function to handle HTTP GET requests to the '/status' URL
// and respond with a message indicating the environment name and port number
const status = (req, res) => {
  res.status(200).send(`Environment '${ENV_NAME}' running on port ${PORT}`);
};

// Define a function to handle HTTP requests that result in a bad request error
// and respond with a 400 status code and an error message
const error = (req, res) => {
  res.status(400).send('400 Bad Request - One required request or parameter');
};

// Export the defined functions for use in other parts of the application
export default { helloWorld, status, error };
