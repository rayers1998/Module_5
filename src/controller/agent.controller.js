// Import the AGENT_SCHEMA from the agent.controller file
const AGENT_SCHEMA = require('../controller/agent.controller');

// Function to create a new agent in the database
const createAgent = async (req, res) => {
    try {
        // Create a new agent with the data from the request body
        // Initialize the 'sales' field to 0
        const agent = await AGENT_SCHEMA.create({ ...req.body, sales: 0 });

        // Log the newly created agent to the console
        console.log('AGENT:', agent);

        // Send a successful response with the created agent's data
        res.status(201).json({ msg: 'Agent created', data: agent });
    } catch (error) {
        // Send an error response if something goes wrong
        res.status(500).json({ error: 'Server error' });
    }
};

// Function to retrieve all agents from the database
const getAllAgents = async (req, res) => {
    try {
        // Find all agents in the database and sort them by last name in ascending order
        const agentsSorted = await AGENT_SCHEMA.find({}).sort({ last_name: 1 });

        // Send a successful response with the sorted list of agents
        res.status(200).json({ data: agentsSorted });
    } catch (error) {
        // Send an error response if something goes wrong
        res.status(500).json({ error: 'Server error' });
    }
};

// Export the createAgent and getAllAgents functions so they can be used in other files
module.exports = {
    createAgent,
    getAllAgents
};