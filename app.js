// Initial dependencies and definitions
require('dotenv').config();
const Express = require('express');
const app = Express();
const port = process.env.PORT || 5555;
const { openMongoConnection } = require('./src/shared/db/mongo-manager');

// Open MongoDB connection
openMongoConnection();

// Import routes
const HealthRoutes = require('./src/routes/health.routes');
const RegionRoutes = require('./src/routes/region.routes');
const AgentRoutes = require('./src/routes/agent.routes');
const LoginRoutes = require('./src/routes/login.routes');

// Middleware
app.use(Express.json());
app.use(BASE_MIDDLEWARE.logger); // Use logger middleware

// Register routes
HealthRoutes.registerHealthRoutes(app);
app.use('/api', RegionRoutes);
app.use('/api', AgentRoutes);
app.use('/api', LoginRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
