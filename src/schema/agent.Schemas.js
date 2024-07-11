// src\schema\region.Schemas.js

// Import the mongoose library to interact with MongoDB, a database to store and manage data.
// Use mongoose features to define your data schemas (blueprints) and create models to perform database CRUD operations.
const mongoose = require('mongoose');

// Define your schema (blueprint) for an agent.
const agentSchema = new mongoose.Schema({
    first_name: { 
        type: String, 
        required: true 
    },
    last_name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    region: { 
        type: String, 
        required: true 
    },
    rating: { 
        type: Number, 
        required: true, 
        default: 50, 
        min: 0, 
        max: 100 
    },
    fee: { 
        type: Number, 
        required: true, 
        default: 0 
    },
    sales: { 
        type: Number, 
        default: 0 
    }
});
// Take the detailed schema (blueprint) for an agent to create a model.
const Agent = mongoose.model('Agent', agentSchema);

// Export the agent model so it can be used in other parts of the application.
module.exports = Agent;
