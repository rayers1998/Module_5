// Import dependencies and definitions
const dotenv = require('dotenv');
dotenv.config();
const Express = require('express');
const app = Express();
const port = process.env.PORT || 5555;

// Middleware
app.use(Express.json());

// Import route (app.js is in the src directory, you do not need to include src again in the import path.)
const healthRoute = require('../Module_5/src/routes/health.route');
const regionRoute = require('../Module_5/src/routes/region.route');
 

// API function calls
healthRoute.healthRouteEndpoint(app);
regionRoute.regionRouteEndpoint(app);


//app.use('/api', regionRoute);

// Defining the variable
const MongoManager = require('../Module_5/src/shared/db/mongodb/mongo-manager');

// Calling the variable to open
MongoManager.openMongoConnection();

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

