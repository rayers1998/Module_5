// src\schema\region.Schemas.js

// Import the mongoose library to interact with MongoDB, a database to store and manage data.
const mongoose = require('mongoose');
// Bring in the schema (blueprint) for an agent from another file.
const agentSchema = require ('../schema/agent.Schemas');

// Set up a detailed schema (plan) for what information a region should have.
const regionSchema = new mongoose.Schema({
    
    region: {
        type: String,
        enum: ['north','south','east','west'], // The region can only be one of these values.
        require: true,                         // The region field is required.
        unique: true                           // The region must be unique.
    },    
    address:{
        type: String                           // The address of the region.
    },
    total_sales:{                              
        type: Number                            // The total sales in the region.
    },
    manager:{                                   
        type: [agentSchema.schema],             // The manager is an agent.
        ref: 'Agent'                           // Their information follows the same structure as other agents.
    },
    top_agents:{
        type: [agentSchema.schema],             // The top agents in the region.
        ref: 'Agent'                           // Their information follows the same structure as other agents.
    }
});

// Use the detailed schema (plan) to create a template for interacting with region data in the database.
const Region = mongoose.model('region', regionSchema);

// Export the region model so it can be used in other parts of the application
module.exports = Region;

