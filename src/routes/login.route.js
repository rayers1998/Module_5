// Import the necessary controller
const { LOGIN_CONTROLLER } = require('../controller/login.controller');

/**
 * Function to set up the login route endpoints
 * @param {Object} app - The Express application instance
 */
const loginRouteEndpoint = (app) => {
    // Endpoint to handle user login
    app.post('/login', LOGIN_CONTROLLER.login);
    
    // Endpoint to handle user logout
    app.get('/logout', LOGIN_CONTROLLER.logout);
};

// Export the function to set up login route endpoints
module.exports = loginRouteEndpoint;
