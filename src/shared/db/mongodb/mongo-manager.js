// Import the mongoose module
const mongoose = require('mongoose');
// Import the dotenv module to load environment variables
const dotenv = require('dotenv');

/**
 * Establishes a connection to the MongoDB database using environment variables for configuration.
 * Utilizes mongoose to connect, with options set for parser and topology.
 * 
 * @returns {Promise<void>} A promise that resolves upon successful database connection, or rejects with an error if the connection fails.
 */
const openMongoConnection = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.MONG_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to MongoDB");
            resolve();
        })
        .catch((error) => {
            console.error('MongoDB connection error:', error);
            reject(error);
        });
    });
};

// Sets the strictQuery option for mongoose to ensure that only valid paths specified in the schema are allowed in queries.
mongoose.set('strictQuery', true);

module.exports = { openMongoConnection };