// Middleware to authenticate access token
const authenticate = (req, res, next) => {
    const accessToken = req.headers['authorization'];

    // Hard-coded access token for simplicity
    const validToken = 'Admin';

    if (accessToken === validToken) {
        next(); // Token is valid, proceed to the next middleware or route handler
    } else {
        res.status(403).json({ error: 'Access Forbidden' }); // Token is invalid, respond with an error
    }
};

// Middleware to log API calls
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
};

export default { authenticate, logger };
