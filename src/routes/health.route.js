// Import the necessary controller
const  HEALTH_CONTROLLER = require('../controller/health.controller');

//Function to set up the health check route endpoints
// @param {Object} app - The Express application instance

const healthRouteEndpoint = (app) => {
    // Endpoint to return a "Hello, World!" message. This endpoint doesn't require any authentication.
    app.get('/hello', HEALTH_CONTROLLER.helloWorld);
    
    // Endpoint to check the status of the application. This endpoint doesn't require any authentication.
    app.get('/status', HEALTH_CONTROLLER.status);
    
    // Endpoint to simulate an error for testing purposes. This endpoint doesn't require any authentication.
    app.get('/error', HEALTH_CONTROLLER.error);
};

// Export the function to set up health check route endpoints
module.exports = healthRouteEndpoint;
