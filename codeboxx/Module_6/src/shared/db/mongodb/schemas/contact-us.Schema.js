// Importing the mongoose module to interact with MongoDB
const mongoose = require('mongoose');

// Defining a shorthand for mongoose.Schema
const Schema = mongoose.Schema;

// Defining the schema for the ContactUs collection
const ContactUsSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company_name: { type: String, required: true },
  project_name: { type: String, required: true },
  project_desc: { type: String, required: true },
  department: { type: String, required: true },
  message: { type: String, required: true },
  file: { type: String, required: false }
});

// Exporting the ContactUs model based on the schema defined
module.exports = mongoose.model('ContactUs', ContactUsSchema);

