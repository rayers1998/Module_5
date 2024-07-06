//*  src/routes/region.route.js

// Import controllers and middleware
import { REGION_CONTROLLER } from '../features/controllers/region.controller.js';
import { BASE_MIDDLEWARE } from '../shared/middleware/base-middleware.js';

// Set up region route endpoints
const regionRouteEndpoint = (app) => {
    // Create a new region (requires authentication and JWT verification)
    app.post('/region-create', 
        BASE_MIDDLEWARE.authenticateToken, 
        BASE_MIDDLEWARE.jwtAuthToken, 
        REGION_CONTROLLER.createRegion
    );

    // Get all regions (requires authentication)
    app.get('/regions', 
        BASE_MIDDLEWARE.authenticateToken, 
        REGION_CONTROLLER.getAllRegions
    );

    // Get regions by country (requires authentication and JWT verification)
    app.get('/regions-by-country', 
        BASE_MIDDLEWARE.authenticateToken, 
        BASE_MIDDLEWARE.jwtAuthToken, 
        REGION_CONTROLLER.getRegionsByCountry
    );

    // Update region info by ID (requires authentication and JWT verification)
    app.patch('/region-update-info/:id', 
        BASE_MIDDLEWARE.authenticateToken, 
        BASE_MIDDLEWARE.jwtAuthToken, 
        REGION_CONTROLLER.updateRegionInfo
    );

    // Delete a region by ID (requires authentication and JWT verification)
    app.delete('/region-delete/:id', 
        BASE_MIDDLEWARE.authenticateToken, 
        BASE_MIDDLEWARE.jwtAuthToken, 
        REGION_CONTROLLER.deleteRegion
    );
};

// Export the route setup function
export default regionRouteEndpoint;
