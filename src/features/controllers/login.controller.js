//*  src/features/controllers/login.controller.js

import REGION_SCHEMA from '../../shared/db/mongodb/schemas/region.Schema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Logs in a user.
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body; // Extract username and password from request body
        const user = await USER_SCHEMA.findOne({ username }); // Find user in the database by username
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password); // Compare provided password with the hashed password in the database
        if (!isMatch) { // If passwords do not match, send a 400 response
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generate a JWT token valid for 1 hour
        res.status(200).json({ msg: 'Login successful', token }); // Send a 200 response with the token indicating a successful login
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Registers a new user.
const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body; // Extract username and password from request body
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password using bcrypt, with a salt round of 10
        const newUser = await USER_SCHEMA.create({ username, password: hashedPassword }); // Create a new user in the database
        res.status(201).json({ msg: 'User registered', data: newUser }); // Send a 201 response to indicate the user was successfully created and return the new user data
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export default { loginUser, registerUser };
