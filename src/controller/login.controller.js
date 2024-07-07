// Import the REGION_SCHEMA from the specified path
const REGION_SCHEMA = require('../schema/region.Schemas');

// Import the bcrypt package for hashing passwords
const bcrypt = require('bcrypt');

// Import the jwt package for creating JSON Web Tokens
const jwt = require('jsonwebtoken');

// Logs in a user
const loginUser = async (req, res) => {
    try {
        // Extract username and password from the request body
        const { username, password } = req.body;

        // Find user in the database by username
        const user = await USER_SCHEMA.findOne({ username });
        if (!user) {
            // If the user is not found, send a 404 Not Found response
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // If the passwords do not match, send a 400 Bad Request response
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token valid for 1 hour
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send a 200 response with the token indicating a successful login
        res.status(200).json({ msg: 'Login successful', token });
    } catch (error) {
        // If there is a server error, send a 500 Internal Server Error response
        res.status(500).json({ error: 'Server error' });
    }
};

// Registers a new user
const registerUser = async (req, res) => {
    try {
        // Extract username and password from the request body
        const { username, password } = req.body;

        // Hash the password using bcrypt with 10 rounds of salting for added security.
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database with the hashed password
        const newUser = await USER_SCHEMA.create({ username, password: hashedPassword });

        // Send a 201 response to indicate the user was successfully created and return the new user data
        res.status(201).json({ msg: 'User registered', data: newUser });
    } catch (error) {
        // If there is a server error, send a 500 Internal Server Error response
        res.status(500).json({ error: 'Server error' });
    }
};

// Export the loginUser and registerUser functions for use in other parts of the application
module.exports = { loginUser, registerUser };
