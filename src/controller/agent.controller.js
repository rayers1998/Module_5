// src\controller\agent.controller.js

// Import the AGENT_SCHEMA from the agent.controller file. 
const AGENT_SCHEMA = require('../schema/agent.Schemas');

// Function to create a new agent in the database
const createAgent = async (req, res) => {
    try {        
        // Use the information given by the user (like a form they filled out) to create a new agent.
    const { first_name, last_name, email, region } = req.body;
    const agent = await AGENT_SCHEMA.create({ 
        first_name, 
        last_name, 
        email, 
        region
    });

        // Log the newly created agent details to the console.
       console.log('AGENT:', agent);

        // Send a message back to the user (agent), confirming the agent and details were successfully added.
        res.status(201).json({ msg: 'Agent created', data: agent });
    } catch (error) {
        // If something goes wrong, send an error response to let the user know there's a server issue.
        res.status(500).json({ error: 'Server error' });
    }
};

// Function to retrieve all agents from the database
const getAllAgents = async (req, res) => {
    try {
        // Find all agents in the database and sort them by last name in ascending order.
        const agentsSorted = await AGENT_SCHEMA.find({}).sort({ last_name: 1 });

        // Send a successful response with the sorted list of agents.
        res.status(200).json({ data: agentsSorted });
    } catch (error) {
        // If something goes wrong, send an error response to let the user know there's a server issue
        res.status(500).json({ error: 'Server error' });
    }
};

// Function to retrieve agents by region from the database
const getAgentsByRegion = async (req, res) => {
    try {
        // Get the region info from the request and use it to find agents in that area
        const agents = await AGENT_SCHEMA.find({ region: req.query.region });

        // Send back the list of agents in that region to the person who asked for it.
        res.status(200).json({ data: agents });
    } catch (error) {
       // If something goes wrong, send an error response to let the user know there's a server issue.
        res.status(500).json({ error: 'Server error' });
    }
};

// Function to update agent information in the database.
const updateAgentInfo = async (req, res) => {
    try {
        // Find the agent by their ID and update their info with the new data the user provided.
        const agent = await AGENT_SCHEMA.findByIdAndUpdate(req.params.id, req.body, { new: true });

        // Confirm to the user that the agent's info was successfully updated.
        res.status(200).json({ msg: 'Agent info updated', data: agent });
    } catch (error) {
        // If something goes wrong, send an error response to let the user know there's a server issue.
        res.status(500).json({ error: 'Server error' });
    }
};

// Function to delete an agent from the database.
const deleteAgent = async (req, res) => {
    try {
        // Find the agent by their ID and delete them from the database.
        await AGENT_SCHEMA.findByIdAndDelete(req.params.id);

        // Confirm to the user that the agent was successfully deleted.
        res.status(200).json({ msg: 'Agent deleted' });
    } catch (error) {
        // If something goes wrong, send an error response to let the user know there's a server issue.
        res.status(500).json({ error: 'Server error' });
    }
};

// Export the functions so they can be used in other files.
module.exports = {
    createAgent,
    getAllAgents,
    getAgentsByRegion,
    updateAgentInfo,
    deleteAgent
};
