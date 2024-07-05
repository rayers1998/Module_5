// Import the necessary controller
import HEALTH_CONTROLLER from '../features/controllers/health.controller.js';

// Define a function to set up the health check route endpoints
const healthRouteEndpoint = (app) => {
    app.get('/hello', HEALTH_CONTROLLER.helloWorld); // Endpoint to return a "Hello, World!" message. This endpoint doesn't require any authentication.
    app.get('/status', HEALTH_CONTROLLER.status); // Endpoint to check the status of the application. This endpoint doesn't require any authentication.
    app.get('/error', HEALTH_CONTROLLER.error); // Endpoint to simulate an error for testing purposes. This endpoint doesn't require any authentication.
};

// Export the function to set up health check route endpoints
export default { healthRouteEndpoint };
