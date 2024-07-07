// Import the mongoose module
const mongoose = require('mongoose');

// Define the schema for an agent
const agentSchema = new mongoose.Schema({
    first_name: { type: String, required: true },      // The first name of the agent (required field)
    last_name: { type: String, required: true },       // The last name of the agent (required field)
    email: { type: String, required: true, unique: true }, // The email of the agent (required field and must be unique)
    region: { type: String, required: true },          // The region the agent is assigned to (required field)
    rating: { type: Number, required: true },          // The rating of the agent (required field)
    fee: { type: Number, required: true },             // The fee associated with the agent (required field)
    sales: { type: Number, default: 0 }                // The sales associated with the agent, default value is 0
});

// Create a model for the agent using the schema
const Agent = mongoose.model('Agent', agentSchema);

// Export the agent model so it can be used in other parts of the application
module.exports = Agent;
