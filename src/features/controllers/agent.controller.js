//*  src/features/controllers/agent.controller.js 

import AGENT_SCHEMA from '../../shared/db/mongodb/schemas/agent.Schema.js';

// Function to create a new agent in the database
const createAgent = async (req, res) => {
    try {
        const agent = await AGENT_SCHEMA.create({ ...req.body, sales: 0 }); // Initialize sales to 0
        console.log('AGENT:', agent);
        res.status(201).json({ msg: 'Agent created', data: agent });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Function to retrieve all agents from the database
const getAllAgents = async (req, res) => {
    try {
        const agentsSorted = await AGENT_SCHEMA.find({}).sort({ last_name: 1 }); // Sort agents by last name
        res.status(200).json({ data: agentsSorted });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Function to retrieve agents by a specified region from the database
const getAgentsByRegion = async (req, res) => {
    try {
        const regionSelected = req.query.region.toLowerCase();
        const agents = await AGENT_SCHEMA.find({ region: regionSelected }).sort({ rating: -1 }); // Sort agents by rating
        if (agents.length === 0) {
            res.status(404).json({ msg: `No agents found in ${regionSelected}` });
        } else {
            res.status(200).json({ data: agents });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Function to update agent info by ID
const updateAgentInfo = async (req, res) => {
    try {
        const { id } = req.body;
        const agent = await AGENT_SCHEMA.findByIdAndUpdate(id, req.body, { new: true });
        if (!agent) {
            res.status(404).json({ error: 'Agent not found' });
        } else {
            res.status(200).json({ msg: 'Agent updated', data: agent });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export default { createAgent, getAllAgents, getAgentsByRegion, updateAgentInfo };
