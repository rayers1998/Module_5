//*  src/features/controllers/region.controller.j

import AGENT_SCHEMA from '../../shared/db/mongodb/schemas/agent.Schema.js';

// Function to create a new agent
const createAgent = async (req, res) => {
    try {
        const agent = await AGENT_SCHEMA.create(req.body);
        if (!agent) {
            res.status(400).send({ error: 'Parameters missing' });
        } else {
            res.status(201).json({ msg: 'Agent created', data: agent });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Function to get all agents
const getAllAgents = async (req, res) => {
    try {
        const agentsSorted = await AGENT_SCHEMA.find({});
        res.status(200).json({ data: agentsSorted });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Function to get agents by region
const getAgentsByRegion = async (req, res) => {
    try {
        const regionSelected = req.query.region.toLowerCase();
        const agents = await AGENT_SCHEMA.find({ region: regionSelected });
        if (agents.length === 0) {
            res.status(404).json({ msg: `No agents found in ${regionSelected}` });
        } else {
            res.status(200).json({ data: agents });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export default { createAgent, getAllAgents, getAgentsByRegion };
