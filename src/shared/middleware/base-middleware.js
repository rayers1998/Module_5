// src\shared\middleware\baseMiddleware.js

// Load environment variables from a .env file.
require('dotenv').config()

// Function to check if the user is allowed to access.
function auth(req,res, next){
    // Look for the 'Authorization' information in the request (data sent from the client to the server).
    const authHeader = req.header('Authorization')
    // Check if the 'Authorization' information matches the secret key in the environment variables.
    if(authHeader != process.env.JWT_SECRET){
        // If it doesn't match, respond with an error message.
        return res.json({err: 'Access Forbidden'})
    }
    // If it matches, move on to the next function.
     next()
}


// Export the authorization function.
module.exports = {auth}



