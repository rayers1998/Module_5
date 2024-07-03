import LOGIN_CONTROLLER from '../features/controllers/login.controller.js';

const loginRouteEndpoint = (app) => {
  app.post('/login', LOGIN_CONTROLLER.login);
  app.get('/logout', LOGIN_CONTROLLER.logout);
  
}

export default {loginRouteEndpoint};