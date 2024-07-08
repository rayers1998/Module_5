// src\shared\middleware\baseMiddleware.js


require('dotenv').config()

function auth(req,res, next){
    const authHeader = req.header('Authorization')
    if(authHeader != process.env.JWT_SECRET){
        return res.json({err: 'Access Forbidden'})
    }
     next()
}

function logger(req,res,next){
        console.log(`${req.method}${req.path}" "${new Date()}`)
    next()
}

module.exports = {auth,logger}





//const jwt = require('jsonwebtoken');

// /**
//  * Middleware to verify JWT tokens included in the authorization header of incoming requests.
//  * This middleware is used to protect routes that require authentication, ensuring that only
//  * requests with valid JWT tokens can access them. It verifies the token and, if valid, adds the
//  * decoded user data to the request object for use in subsequent middleware or route handlers.
//  * 
//  * @param {Object} req - The HTTP request object. The middleware expects an authorization header with a Bearer token.
//  * @param {Object} res - The HTTP response object used to send responses to the client.
//  * @param {Function} next - The next middleware function in the Express middleware chain.
//  */
// const baseMiddleware = (req, res, next) => {
//   // Check for the presence of the authorization header
//   if (!req.headers.authorization) {
//     return res.status(403).json({ error: "Access Forbidden, Authorization header required" });
//   }

//   // Extract the token from the authorization header
//   const token = req.headers.authorization.split(' ')[1]; // Expected format: "Bearer YOUR_JWT"

//   // Verify the existence of the token
//   if (!token) {
//     return res.status(403).json({ error: "Access Forbidden, token required" });
//   }

//   try {
//     // Verify the token using the secret key
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // Attach decoded user data to the request object
//     req.userData = decoded;
//     // Proceed to the next middleware
//     next();
//   } catch (error) {
//     // Handle any errors related to token verification
//     return res.status(401).json({ error: "Auth failed" });
//   }
// };

//module.exports = baseMiddleware;
