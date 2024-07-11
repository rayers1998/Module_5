// src\routes\agent.route.js

// Import the controllers that handle agent tasks.
// Import the middleware that handle security checks (requires token authentication and JWT verification). 
const AGENT_CONTROLLER = require('../controller/agent.controller');
const BASE_MIDDLEWARE = require('../shared/middleware/base-middleware');

// Set up agent route (path) endpoints.
const agentRouteEndpoint = (app) => {
    // Route (path) to add a new agent (requires token authentication).
    app.post('/agent-create',
        BASE_MIDDLEWARE.auth, // Middleware to authenticate the token.
        AGENT_CONTROLLER.createAgent       // Controller to handle the creation of the new agent.
    );

    // Route (path) to Get all agents (requires token authentication.
    app.get('/agents',
        BASE_MIDDLEWARE.auth, // Middleware to authenticate the token.
        AGENT_CONTROLLER.getAllAgents      // Controller to handle fetching all agents.
    );

    // Get agents by region (requires token authentication)
    app.get('/agents-by-region',
        BASE_MIDDLEWARE.auth, // Middleware to authenticate the token.
        AGENT_CONTROLLER.getAgentsByRegion // Controller to handle fetching agents by region.
    );

    // Update agent info by ID (Authentication is 
    app.get('/agents',
        BASE_MIDDLEWARE.auth, // Middleware to authenticate the token.
        AGENT_CONTROLLER.updateAgentInfo   // Controller to handle updating agent info by ID
    );

    // Delete an agent by ID (requires token authentication)
    app.delete('/agent-delete/:id',
        BASE_MIDDLEWARE.auth, // Middleware to authenticate the token.
        AGENT_CONTROLLER.deleteAgent       // Controller to handle deleting an agent by ID.
    );
};

// Export the route setup function so it can be used elsewhere.
module.exports = {agentRouteEndpoint
};
