// Importing shared data resources
const Data = require('../../shared/resources/data');

// Importing the ContactUs model for interacting with the MongoDB collection
const ContactUs = require('../../shared/db/mongodb/schemas/contactus.schema'); // Adjust the path as needed

/**
 * Handles contact form submissions.
 * Extracts form data from the request body, saves it to the MongoDB database, and responds to the client.
 */
const contactUs = async (req, res) => {
  // Destructuring the request body to extract the form fields
  const {
    fullname,
    email,
    phone,
    company_name,
    project_name,
    project_desc,
    department,
    message,
    file
  } = req.body;

  try {
    // Creating a new ContactUs document with the extracted form data
    const newContact = new ContactUs({
      fullname,
      email,
      phone,
      company_name,
      project_name,
      project_desc,
      department,
      message,
      file
    });

    // Saving the new ContactUs document to the MongoDB database
    await newContact.save();

    // Sending a success response back to the client indicating the data was saved
    res.status(200).json({ message: 'Contact information saved successfully!' });
  } catch (error) {
    // Sending an error response back to the client if an error occurs during the save operation
    res.status(500).json({ message: 'An error occurred while saving contact information.', error });
  }
};

module.exports = { contactUs };



const calculateResidentialQuote = (req,res) => {
  // define constants
  const apts = +req.query.apts;
  const floors = +req.query.floors;
  const tier = req.query.tier.toLowerCase();

  // validate request object
  if(!Object.keys(Data.unitPrices).includes(tier)){
    res.status(400);
    res.send(`Error: invalid tier`);
    return;
  }
  
  if(isNaN(floors) || isNaN(apts)){
    res.status(400);
    res.send(`Error: apts and floors must be specified as numbers`);
    return;
  }

  if(!Number.isInteger(floors) || !Number.isInteger(apts)){
    res.status(400);
    res.send(`Error: apts and floors must be integers`);
    return;
  }

  if(floors < 1 || apts < 1){
    res.status(400);
    res.send(`apts and floors must be greater than zero`);
    return;
  }

  // business logic
  const numElevators = calcResidentialElev(floors,apts);
  const totalCost = calcInstallFee(numElevators,tier);

  // format response
  res.send({
    elevators_required:numElevators,
    cost: totalCost
  });
};

const calcResidentialElev = (numFloors, numApts) => {
  const elevatorsRequired = Math.ceil(numApts / numFloors / 6)*Math.ceil(numFloors / 20);
  return elevatorsRequired;
};

const calcCommercialElev = (numFloors, maxOccupancy) => {
  const elevatorsRequired = Math.ceil((maxOccupancy * numFloors) / 200)*Math.ceil(numFloors / 10);
  const freighElevatorsRequired = Math.ceil(numFloors / 10);
  return freighElevatorsRequired + elevatorsRequired;
};

const calcInstallFee = (numElvs, tier) => {
  const unitPrice = Data.unitPrices[tier];
  const installPercentFees = Data.installPercentFees[tier];
  const total = numElvs * unitPrice * installPercentFees;
  return total;
};

module.exports = {contactUs,calculateResidentialQuote};