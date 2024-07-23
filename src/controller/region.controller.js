// src\controller\region.controller.js

// Import the Region schema from the specified path
const Region = require('../schema/region.Schemas.js');
// Import the Agent schema from the specified path
const Agent = require('../schema/agent.Schemas.js');

/**
 * Creates a new region in the database if it doesn't already exist.
 * 
 * @param {Object} req - The HTTP request object, containing the region, address, manager, total_sales, and top_agents in the body.
 * @param {Object} res - The HTTP response object used for sending responses back to the client.
 */
const createRegion = async (req, res) => {
    try {
        // Extract region data from the request body
        const { region, address, manager, total_sales, top_agents } = req.body;
        
        // Check if the region already exists
        const regionExists = await Region.findOne({ region });
        if (regionExists) {
            // If the region exists, send a 400 Bad Request response
            return res.status(400).json({ error: 'Region already exists' });
        }
        // Grab the agent from the corresponding region; these will drive other things.
        const AGENTS_IN_REGION = await Agent.find ({ region, region});
        
        // Get the total sales of agents in region.
        const TOTAL_SALES = AGENTS_IN_REGION.filter ( e => e.sales);
        
        // Get what agent is a manager in a region.
        const MANAGER = AGENTS_IN_REGION.filter ( e => e.posiion === 'manager');

        // Get the top agents in the region.
        const TOP_AGENTS = AGENTS_IN_REGION.filter(e => e.isTopAgent);

        // Create a new region object
        const newRegion = new Region({
            region,
            address,
            TOTAL_SALES,
            MANAGER,
            top_agents
        });

        // Save the new region to the database
        await newRegion.save();
        // Send a 201 Created response with the new region data
        res.status(201).json(newRegion);
    } catch (error) {
        // If there's an error, send a 400 Bad Request response with the error message
        res.status(400).json({ error: error.message });
    }
};

/**
 * Retrieves information about a specific region, including manager and top agents.
 * 
 * @param {Object} req - The HTTP request object, containing the region name in the query.
 * @param {Object} res - The HTTP response object used for sending back the region's information.
 */
const getRegionInfo = async (req, res) => {
    try {
        // Extract the region name from the query parameters
        const { region } = req.query;
        // Find the region in the database and populate the manager and top agents
        const regionInfo = await Region.findOne({ region }).populate('manager top_agents');

        if (!regionInfo) {
            // If the region is not found, send a 404 Not Found response
            return res.status(404).json({ message: "Region not found" });
        }

        // Send a 200 OK response with the region information
        res.status(200).json(regionInfo);
    } catch (error) {
        // If there's an error, send a 500 Internal Server Error response with the error message
        res.status(500).json({ error: error.message });
    }
};

/**
 * Retrieves a list of the top agents in all regions, sorted by sales in descending order.
 * 
 * @param {Object} req - The HTTP request object. Not used in this function but included for API consistency.
 * @param {Object} res - The HTTP response object used for sending back the list of all-stars agents.
 */
const getAllStars = async (req, res) => {
    try {
        // Use MongoDB aggregation to find top agents and sort them by sales
        const allStars = await Region.aggregate([
            {
                $lookup: {
                    from: "agents",
                    localField: "top_agents",
                    foreignField: "_id",
                    as: "agent_details"
                }
            },
            { $unwind: "$agent_details" },
            { $sort: { "agent_details.sales": -1 } },
            {
                $group: {
                    _id: "$_id",
                    region: { $first: "$region" },
                    top_agent: { $first: "$agent_details" }
                }
            },
            {
                $project: {
                    _id: 0,
                    region: 1,
                    top_agent: {
                        _id: "$top_agent._id",
                        name: "$top_agent.name",
                        sales: "$top_agent.sales"
                    }
                }
            }
        ]);

        // Send a 200 OK response with the list of all-stars agents
        res.status(200).json(allStars);
    } catch (error) {
        // If there's an error, send a 500 Internal Server Error response with the error message
        res.status(500).json({ error: error.message });
    }
};

/**
 * Creates a new region in the database. Before creation, it checks if the region already exists
 * to avoid duplicates. It calculates the total sales for the region by summing up the sales of
 * the top agents provided in the request. If the region does not exist, it creates a new region
 * with the calculated total sales.
 * 
 * @param {Object} req - The HTTP request object, containing the region, address, manager, and top_agents in the body.
 * @param {Object} res - The HTTP response object used for sending responses back to the client.
 */
const createRegionWithSales = async (req, res) => {
    try {
        // Extract region data from the request body
        const { region, address, manager, top_agents } = req.body;

        // Check if the region already exists
        const regionExists = await Region.findOne({ region });
        if (regionExists) {
            // If the region exists, send a 400 Bad Request response
            return res.status(400).json({ error: 'Region already exists' });
        }

        // Calculate total sales by summing up sales of agents in the region
        let total_sales = 0;
        if (top_agents && top_agents.length > 0) {
            const agentsSales = await Agent.find({
                '_id': { $in: top_agents }
            }).select('sales -_id'); // Select only the sales field

            // Sum up all the sales from the agents
            total_sales = agentsSales.reduce((acc, agent) => acc + agent.sales, 0);
        }

        // Create a new region with the calculated total sales
        const newRegion = new Region({
            region,
            address,
            total_sales, // This is now dynamically calculated
            manager,
            top_agents
        });

        // Save the new region to the database
        await newRegion.save();

        // Send a 201 Created response with the new region data
        res.status(201).json(newRegion);
    } catch (error) {
        // If there's an error, send a 400 Bad Request response with the error message
        res.status(400).json({ error: error.message });
    }
};

// Export the functions for use in other parts of the application
module.exports = { createRegion, getRegionInfo, getAllStars, createRegionWithSales };
