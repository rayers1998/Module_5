import REGION_CONTROLLER from '../features/controllers/region.controller.js';
import BASE_MIDDLEWARE from '../shared/middleware/base-middleware.js';

const regionRouteEndpoint = (app) => {
  app.post('/region-create', BASE_MIDDLEWARE.authenticateToken, BASE_MIDDLEWARE.jwtAuthToken, REGION_CONTROLLER.createRegion);
  app.get('/regions', BASE_MIDDLEWARE.authenticateToken, REGION_CONTROLLER.getAllRegions);
  app.get('/regions-by-country', BASE_MIDDLEWARE.authenticateToken, BASE_MIDDLEWARE.jwtAuthToken, REGION_CONTROLLER.getRegionsByCountry);
  app.patch('/region-update-info/:id', BASE_MIDDLEWARE.authenticateToken, BASE_MIDDLEWARE.jwtAuthToken, REGION_CONTROLLER.updateRegionInfo);
  app.delete('/region-delete/:id', BASE_MIDDLEWARE.authenticateToken, BASE_MIDDLEWARE.jwtAuthToken, REGION_CONTROLLER.deleteRegion);
}

export default { regionRouteEndpoint };

