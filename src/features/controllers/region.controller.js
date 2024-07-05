import AGENT_SCHEMA from '../../shared/db/mongodb/schemas/agent.Schema.js';

// Function to create a new agent
const createAgent = async (req, res) => {
    try {
        // Create a new agent using the data from the request body
        const AGENT = await AGENT_SCHEMA.create(req.body);
        console.log('AGENT: ', AGENT);
        // If the agent was not created, send a 400 response indicating a bad request
        if (!AGENT) {
            return res.status(400).send({ error: "Parameters missing" });
        }
        // Send a 201 response indicating the agent was successfully created, and return the new agent data
        res.status(201).json({ msg: 'Agent created', data: AGENT });
    } catch (error) {
        // If there's a server error, send a 500 response
        res.status(500).json({ error: 'Server error' });
    }
};

// Function to get all agents
const getAllAgents = async (req, res) => {
    try {
        // Retrieve all agents from the database
        const AGENTS_SORTED = await AGENT_SCHEMA.find({});
        // Send a 200 response indicating that the request was successful, along with the list of retrieved agents
        res.status(200).json({ data: AGENTS_SORTED });
    } catch (error) {
        // If there's a server error, send a 500 response
        res.status(500).json({ error: 'Server error' });
    }
};

// Function to get agents by region
const getAgentsByRegion = async (req, res) => {
    try {
        // Get the region parameter from the query string and convert it to lowercase
        const REGION_SELECTED = req.query.region.toLowerCase();
        // Find agents in the specified region
        const AGENTS = await AGENT_SCHEMA.find({ region: REGION_SELECTED });
        // If no agents are found, send a 404 response indicating no agents were found in the region
        if (AGENTS.length === 0) {
            return res.status(404).json({ msg: `No agents found in ${REGION_SELECTED}` });
        }
       // Send a 200 response indicating that the request was successful, along with the list of retrieved agents
        res.status(200).json({ data: AGENTS });
    } catch (error) {
        // If there's a server error, send a 500 response
        res.status(500).json({ error: 'Server error' });
    }
};

export default { createAgent, getAllAgents, getAgentsByRegion };







