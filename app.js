// app.js is the main hub everything runs through.

// IMPORT DEPENDENCIES AND DEFINITIONS
const dotenv = require('dotenv'); // Load environment variables from a .env file.
dotenv.config(); // Configure dotenv to use the .env file.
const Express = require('express'); // Import the Express library for creating the server.
const app = Express(); // Create an instance of an Express application.
const port = process.env.PORT || 5555; // Define the port number from the environment variable or use 5555 as default.

// MIDDLEWARE
app.use(Express.json()); // Use middleware to parse JSON data in incoming requests.

// IMPORT ROUTE 
const healthRoute = require('../Module_5/src/routes/health.route'); // Import the health route
const regionRoute = require('../Module_5/src/routes/region.route'); // Import the region route

// API FUNCTION CALLS
healthRoute.healthRouteEndpoint(app); // Set up the health route endpoint

//regionRoute.regionRouteEndpoint(app); // Set up the region route endpoint (currently commented out)
//app.use('/api', regionRoute); // Use the region route for all '/api' paths (currently commented out)

// DEFINING THE VARIABLE
const MongoManager = require('../Module_5/src/shared/db/mongodb/mongo-manager'); // Import the MongoDB connection manager

// CALLING THE VARIABLE TO OPEN
MongoManager.openMongoConnection(); // Open the connection to the MongoDB database

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`); // Start the server and listen on the defined port
});

