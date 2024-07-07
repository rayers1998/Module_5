// Import the mongoose module
const mongoose = require('mongoose')
const agentSchema = require ('../schema/agent.Schemas')
// Define the schema for a region
const regionSchema = new mongoose.Schema({
    
    region: {
        type: String,
        enum: ['north','south','east','west'],
        require: true,
        unique: true
    },
    address:{
        type: String
    },
    total_sales:{
        type: Number
    },
    manager:{
        type: [agentSchema.schema],
        ref: 'Agents'
    },
    top_agents:{
        type: [agentSchema.schema],
        ref: 'Agents'
    }
})

const region = mongoose.model('region', regionSchema);

module.exports=region









// Create a model for the region using the schema
const Region = mongoose.model('Region', regionSchema);

// Export the region model so it can be used in other parts of the application
module.exports = regionSchema;

