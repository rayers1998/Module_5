// src\schema\region.Schemas.js

// Import the mongoose library to interact with MongoDB, a database to store and manage data.
// Use mongoose features to define your data schemas (blueprints) and create models to perform database CRUD operations.
const mongoose = require('mongoose');

// Define your schema (blueprint) for an agent.
const agentSchema = new mongoose.Schema({
    first_name: { type: String, required: true },      // The agent's first name (required).
    last_name: { type: String, required: true },       // The agent's last name (required).
    email: { type: String, required: true, unique: true }, // The agent's email (must be unique & required).
    region: { type: String, required: true },          // The region where the agent works (required).
    rating: { type: Number, required: true },          // The agent's rating (required).
    fee: { type: Number, required: true },             // The agent's fee (required).
    sales: { type: Number, default: 0 }                // The agent's sales, starts at 0 by default.
});

// Take the detailed schema (blueprint) for an agent to create a model.
// The model allows us to create new agent records and interact with the agent data in the database(e.g., saving new agents, finding agents, updating their info, etc.)
const Agent = mongoose.model('Agent', agentSchema);

// Export the agent model so it can be used in other parts of the application.
module.exports = Agent;
