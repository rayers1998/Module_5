import AGENT_SCHEMA from '../../shared/db/mongodb/schemas/agent.Schema.js';

// Function to create a new agent in the database
const createAgent = async (req, res) => {
  // Create a new agent document using the request body data
  const AGENT = await AGENT_SCHEMA.create(req.body);
  
  // Log the created agent to the console for debugging
  console.log('AGENT: ', AGENT);
  
  // If the agent creation fails, send a 404 error response with an error message
  if (!AGENT) {
    res.status(404).send({ error: "parameters missing" });
    return;
  }
  
  // If the agent creation is successful, send a 201 response with a success message and the created agent data
  res.status(201).json({ msg: 'Agent created', data: AGENT });
};

// Function to retrieve all agents from the database
const getAllAgents = async (req, res) => {
  // Find all agent documents in the database and sort them (default sorting)
  const AGENTS_SORTED = await AGENT_SCHEMA.find({});
  
  // Send a 200 response with the sorted agent data
  res.status(200).json({ data: AGENTS_SORTED });
};

// Function to retrieve agents by a specified region from the database
const getAgentsByRegion = async (req, res) => {
  // Extract the region from the query parameters and convert it to lowercase
  const REGION_SELECTED = req.query.region.toLowerCase();
  
  // Find all agent documents that match the specified region
  const AGENTS = await AGENT_SCHEMA.find({ region: REGION_SELECTED });
  
  // If no agents are found in the specified region, send a 404 response with an error message
  if (AGENTS.length === 0) {
    res.status(404).json({ msg: `No agents found in ${REGION_SELECTED}` });
  } else {
    // If agents are found, send a 200 response with the agent data
    res.status(200).json({ data: AGENTS });
  }
};

// Export the defined functions for use in other parts of the application
export default { createAgent, getAllAgents, getAgentsByRegion };
