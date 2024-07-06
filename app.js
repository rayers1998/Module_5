// app.js

// Import dependencies and definitions
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
const port = process.env.PORT || 5555;
import { openMongoConnection } from './shared/db/mongodb/mongo-manager.js';
//This path correctly navigates from src/app.js to src/shared/db/mongodb/mongo-manager.js

// Open MongoDB connection
openMongoConnection();

// Import route (app.js is in the src directory, you do not need to include src again in the import path.)
import healthRoute from './routes/health.route.js';
import regionRoute from './routes/region.route.js';


// Middleware
app.use(express.json());

// Register route
healthRoute(app);
app.use('/api', regionRoute);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
