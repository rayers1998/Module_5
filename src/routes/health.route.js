import HEALTH_CONTROLLER from '../features/controllers/health.controller.js';

const healthRouteEndpoint = (app) => {
  app.get('/hello', HEALTH_CONTROLLER.helloWorld);
  app.get('/status', HEALTH_CONTROLLER.status);
  app.get('/error', HEALTH_CONTROLLER.error);
}

export default { healthRouteEndpoint };