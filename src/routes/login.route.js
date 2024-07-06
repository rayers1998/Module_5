//*  src/routes/login.route.js

// Import the necessary controller
import { LOGIN_CONTROLLER } from '../features/controllers/login.controller.js';

// Define a function to set up the login route endpoints
const loginRouteEndpoint = (app) => {
    app.post('/login', LOGIN_CONTROLLER.login); // Endpoint to handle user login
    app.get('/logout', LOGIN_CONTROLLER.logout); // Endpoint to handle user logout
};

// Export the function to set up login route endpoints
export default loginRouteEndpoint;
