const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For creating tokens

const app = express();
const PORT = 3000;

// --- Configuration ---
const JWT_SECRET = 'your-super-secret-key-that-should-be-in-an-env-file'; // In a real app, use environment variables!
const MONGO_URL = 'mongodb://localhost:27017';
const DB_NAME = 'authApp';
let db;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Connect to MongoDB ---
MongoClient.connect(MONGO_URL)
    .then(client => {
        console.log('Successfully connected to MongoDB');
        db = client.db(DB_NAME);
        app.listen(PORT, () => {
            console.log(`Authentication server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    });

// --- API Routes ---

// [POST] /register: Creates a new user
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }

        // Check if the user already exists
        const existingUser = await db.collection('users').findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already taken.' });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Store the new user in the database
        const result = await db.collection('users').insertOne({
            username,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});

// [POST] /login: Authenticates a user and returns a JWT
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }

        // Find the user in the database
        const user = await db.collection('users').findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' }); // User not found
        }

        // Compare the provided password with the stored hashed password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid credentials.' }); // Wrong password
        }

        // If credentials are correct, create a JWT
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error during login.' });
    }
});
