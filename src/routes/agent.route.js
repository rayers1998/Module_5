import AGENT_CONTROLLER from '../features/controllers/agent.controller.js';
import BASE_MIDDLEWARE from '../shared/middleware/base-middleware.js';


const agentRouteEndpoint = (app) => {
  app.post('/agent-create', BASE_MIDDLEWARE.authenticateToken, BASE_MIDDLEWARE.jwtAuthToken, AGENT_CONTROLLER.createAgent);
  app.get('/agents', BASE_MIDDLEWARE.authenticateToken, AGENT_CONTROLLER.getAllAgents);
  app.get('/agents-by-region', BASE_MIDDLEWARE.authenticateToken, BASE_MIDDLEWARE.jwtAuthToken, AGENT_CONTROLLER.getAgentsByRegion);
  app.patch('agent-update-info/:id', BASE_MIDDLEWARE.authenticateToken, BASE_MIDDLEWARE.jwtAuthToken, AGENT_CONTROLLER.updateAgentinfo);
  app.delete('agent-delete/:id', BASE_MIDDLEWARE.authenticateToken, BASE_MIDDLEWARE.jwtAuthToken, AGENT_CONTROLLER.deleteAgent);
}

  export default {agentRouteEndpoint};