const express = require('express');
const cors = require('cors'); // Import the CORS middleware

const app = express();
const PORT = 3000;

// --- Middleware ---
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

// --- In-Memory Database for To-Do Items ---
let todos = [
    { id: 1, text: 'Learn Node.js', completed: false },
    { id: 2, text: 'Build a React App', completed: false },
    { id: 3, text: 'Connect frontend to backend', completed: true }
];
let nextId = 4;

// --- API Routes for Todos ---

// GET /todos: Retrieve all to-do items
app.get('/todos', (req, res) => {
    res.json(todos);
});

// POST /todos: Create a new to-do item
app.post('/todos', (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ message: 'Todo text is required' });
    }

    const newTodo = { id: nextId++, text, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// DELETE /todos/:id: Delete a to-do item
app.delete('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t => t.id === todoId);

    if (todoIndex === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    todos.splice(todoIndex, 1);
    res.status(200).json({ message: 'Todo deleted successfully' });
});

// --- Start the server ---
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});
