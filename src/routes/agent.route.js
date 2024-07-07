// Import controllers and middleware
const { AGENT_CONTROLLER } = require('../controller/agent.controller');
const { BASE_MIDDLEWARE } = require('../shared/middleware/base-middleware');

// Set up agent route endpoints
const agentRouteEndpoint = (app) => {
    // Create a new agent (requires token authentication and JWT verification)
    app.post('/agent-create',
        BASE_MIDDLEWARE.authenticateToken, // Middleware to authenticate the token
        BASE_MIDDLEWARE.jwtAuthToken,      // Middleware to verify JWT
        AGENT_CONTROLLER.createAgent       // Controller to handle agent creation
    );

    // Get all agents (requires token authentication)
    app.get('/agents',
        BASE_MIDDLEWARE.authenticateToken, // Middleware to authenticate the token
        AGENT_CONTROLLER.getAllAgents      // Controller to handle fetching all agents
    );

    // Get agents by region (requires token authentication and JWT verification)
    app.get('/agents-by-region',
        BASE_MIDDLEWARE.authenticateToken, // Middleware to authenticate the token
        BASE_MIDDLEWARE.jwtAuthToken,      // Middleware to verify JWT
        AGENT_CONTROLLER.getAgentsByRegion // Controller to handle fetching agents by region
    );

    // Update agent info by ID (requires token authentication and JWT verification)
    app.patch('/agent-update-info/:id',
        BASE_MIDDLEWARE.authenticateToken, // Middleware to authenticate the token
        BASE_MIDDLEWARE.jwtAuthToken,      // Middleware to verify JWT
        AGENT_CONTROLLER.updateAgentInfo   // Controller to handle updating agent info by ID
    );

    // Delete an agent by ID (requires token authentication and JWT verification)
    app.delete('/agent-delete/:id',
        BASE_MIDDLEWARE.authenticateToken, // Middleware to authenticate the token
        BASE_MIDDLEWARE.jwtAuthToken,      // Middleware to verify JWT
        AGENT_CONTROLLER.deleteAgent       // Controller to handle deleting an agent by ID
    );
};

// Export the route setup function
module.exports = agentRouteEndpoint;

