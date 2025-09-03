const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');

const app = express();
const PORT = 3000;

// --- Configuration ---
const JWT_SECRET = 'your-super-secret-key-for-day-15'; // In a real app, use environment variables!
const MONGO_URL = 'mongodb://localhost:27017';
const DB_NAME = 'fullstackAuthApp';
let db;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Database Connection ---
MongoClient.connect(MONGO_URL)
    .then(client => {
        console.log('Successfully connected to MongoDB');
        db = client.db(DB_NAME);
        app.listen(PORT, () => {
            console.log(`Full-stack auth server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    });

// --- Authentication Middleware ---
// This function will be used to protect our routes
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

    if (token == null) {
        return res.sendStatus(401); // Unauthorized - No token provided
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden - Token is invalid
        }
        req.user = user; // Attach user info to the request object
        next(); // Proceed to the next function in the chain
    });
};

// --- API Routes ---

// [POST] /register: Public route to create a new user
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }
        const existingUser = await db.collection('users').findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already taken.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.collection('users').insertOne({ username, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// [POST] /login: Public route to authenticate a user and get a token
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await db.collection('users').findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// [GET] /protected: A PROTECTED route that requires a valid token
app.get('/protected', authenticateToken, (req, res) => {
    // Because of the `authenticateToken` middleware, this code will only run
    // if the user has provided a valid JWT. The user's info is in `req.user`.
    res.json({
        message: `Welcome, ${req.user.username}! You are seeing the secret, protected content.`,
        user: req.user
    });
});
