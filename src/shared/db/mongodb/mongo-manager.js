// src\shared\db\mongo\mongo-manager.js

// Import the mongoose library to interact with MongoDB.
const mongoose = require('mongoose');
// Import the dotenv module to use environment variables.
const dotenv = require('dotenv');

/**
 * Connects to the MongoDB database.
 * Uses settings stored in environment variables to configure the connection.
 * Mongoose is used to handle the connection, with specific settings for how data is parsed and managed.
 * 
 * @returns {Promise<void>} This function returns a promise, which is like a "future" result.
 *                          It will either say "connection successful" or "connection failed".
 */

const openMongoConnection = () => {
    return new Promise((resolve, reject) => {
        // Try to connect to the database using the connection string and some settings.
        mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            // If the connection is successful, print a message and resolve the promise.
            console.log("Connected to MongoDB");
            resolve();
        })
        // If there is an error, print an error message and reject the promise.
        .catch((error) => {
            console.error('MongoDB connection error:', error);
            reject(error);
        });
    });
};

// Sets the strictQuery option for mongoose to ensure that only valid paths specified in the schema are allowed in queries.
mongoose.set('strictQuery', true);

// Export the openMongoConnection function so it can be used in other parts of the project.
module.exports = { openMongoConnection };