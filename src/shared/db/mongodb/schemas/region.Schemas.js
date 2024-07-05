// Import the mongoose module
const mongoose = require('mongoose');

// Define the schema for a region
const regionSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // The name of the region (required field and must be unique)
    country: { type: String, required: true }, // The country where the region is located (required field)
    agents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agent' }] // List of agents associated with this region, referenced by their ObjectId
});

// Create a model for the region using the schema
const Region = mongoose.model('Region', regionSchema);

// Export the region model so it can be used in other parts of the application
module.exports = Region;
