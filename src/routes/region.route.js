// src\routes\region.route.js

// Import the controllers that handle region tasks.
// Import the middleware that handle security checks (requires token authentication and JWT verification).
const REGION_CONTROLLER = require('../controller/region.controller');
const BASE_MIDDLEWARE = require('../shared/middleware/base-middleware');

// Set up region route (path) endpoints.
const regionRouteEndpoint = (app) => {
    // Route (path) to add a new region (requires token authentication and JWT verification security checks).
    app.post('/region-create',
        BASE_MIDDLEWARE.auth,          // Middleware to authenticate the token (checks if the user has permission).
        BASE_MIDDLEWARE.jwtAuthToken,  // Middleware to verify JWT (ensures the user's token is valid).
        REGION_CONTROLLER.createRegion // Controller to handle the creation of the new region.
    );

    // Route (path) to get all regions (requires token authentication security check).
    app.get('/region',
        BASE_MIDDLEWARE.auth,         // Middleware to authenticate the token (checks if the user has permission).
        REGION_CONTROLLER.getRegions  // Controller to handle fetching all regions.
    );

    // Route (path) to get all-stars (requires token authentication security check).
    app.get('/all-stars',
        BASE_MIDDLEWARE.auth,         // Middleware to authenticate the token (checks if the user has permission).
        REGION_CONTROLLER.getAllStars // Controller to handle fetching the all-stars.
    );
};

// Export the route setup function so it can be used elsewhere.
module.exports = { regionRouteEndpoint };

