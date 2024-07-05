// Import controllers and middleware
import AGENT_CONTROLLER from '../features/controllers/agent.controller.js';
import BASE_MIDDLEWARE from '../shared/middleware/base-middleware.js';

// Set up agent route endpoints
const agentRouteEndpoint = (app) => {
    // Create a new agent (requires token authentication and JWT verification)
    app.post('/agent-create', BASE_MIDDLEWARE.authenticateToken, BASE_MIDDLEWARE.jwtAuthToken, AGENT_CONTROLLER.createAgent);

    // Get all agents (requires token authentication)
    app.get('/agents', BASE_MIDDLEWARE.authenticateToken, AGENT_CONTROLLER.getAllAgents);

    // Get agents by region (requires token authentication and JWT verification)
    app.get('/agents-by-region', BASE_MIDDLEWARE.authenticateToken, BASE_MIDDLEWARE.jwtAuthToken, AGENT_CONTROLLER.getAgentsByRegion);

    // Update agent info by ID (requires token authentication and JWT verification)
    app.patch('/agent-update-info', BASE_MIDDLEWARE.authenticateToken, BASE_MIDDLEWARE.jwtAuthToken, AGENT_CONTROLLER.updateAgentInfo);

    // Delete an agent by ID (requires token authentication and JWT verification)
    app.delete('/agent-delete', BASE_MIDDLEWARE.authenticateToken, BASE_MIDDLEWARE.jwtAuthToken, AGENT_CONTROLLER.deleteAgent);
};

// Export the route setup function
export default { agentRouteEndpoint };
