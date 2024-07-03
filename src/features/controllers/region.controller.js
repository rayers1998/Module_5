import AGENT_SCHEMA from '../../shared/db/mongodb/schemas/agent.Schema.js';

const createAgent = async (req,res) => {
  const AGENT = await AGENT_SCHEMA.create(req,body);
  console.log('AGENT: ', AGENT)
  if (!AGENT) {
      res.status(404).send({error: "parameters missing"}) 
  }
  res.status(201).json({ msg: 'Agent created', data: AGENT });
};

const getAllAgents = async (req, res) => {
    const AGENTS_SORTED = await AGENT_SCHEMA.find({})
    res.status(200).json({ data: AGENTS_SORTED });
};

const getAgentsByRegion = async (req, res) => {
    const REGION_SELECTED = req.query.region.toLowerCase();
    const AGENTS = await AGENT_SCHEMA.find({ region: REGION_SELECTED});
    if (AGENTS.length === 0) {
        res.status(404).json({ msg: 'No agents found in ${REGION_SELECTED}' });
    } else {}
    

    }


}



