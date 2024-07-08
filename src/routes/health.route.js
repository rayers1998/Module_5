// Import the necessary controller
const  HealthController = require('../controller/health.controller');

//Function to set up the health check route endpoints
// @param {Object} app - The Express application instance

const healthRouteEndpoint = (app) => {
    // Endpoint to return a "Hello, World!" message. This endpoint doesn't require any authentication.
    app.get('/hello', HealthController.helloWorld);
    
    // Endpoint to check the status of the application. This endpoint doesn't require any authentication.
    app.get('/status', HealthController.status);
    
    // Endpoint to simulate an error for testing purposes. This endpoint doesn't require any authentication.
    app.get('/error', HealthController.error);
};

// Export the function to set up health check route endpoints
module.exports = {healthRouteEndpoint};
