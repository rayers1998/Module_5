// Import controllers and middleware
const REGION_CONTROLLER = require('../controller/region.controller');
const BASE_MIDDLEWARE = require('../shared/middleware/base-middleware');

//**
 //Function to set up the region route endpoints
 // @param {Object} app - The Express application instance
 
const regionRouteEndpoint = (app) => {
    // Create a new region (requires authentication and JWT verification)
    app.post('/region-create',
        BASE_MIDDLEWARE.authenticateToken,
        BASE_MIDDLEWARE.jwtAuthToken,
        REGION_CONTROLLER.createRegion
    );

    // Get all regions (requires authentication)
   // app.get('/regions',
 
};

// Export the route setup function
module.exports = regionRouteEndpoint;
