// Initial dependencies and definitions
require('dotenv').config();
const Express = require('express');
const app = Express();
const port = process.env.PORT || 555;
const { openMongoConnection } = require('./src/shared/db/mongodb/mongo-manager');

// Open MongoDB connection
openMongoConnection();

// Import routes
const HealthRoutes = require('./src/routes/health.routes');
const RegionRoutes = require('./src/routes/region.routes');

// Middleware
app.use(Express.json());

// Register routes
HealthRoutes.registerHealthRoutes(app);
app.use('/api', RegionRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

