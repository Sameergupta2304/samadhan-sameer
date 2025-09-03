const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// --- In-Memory Database ---
// In a real app, you'd connect to a proper database here.
let students = [
    { id: 1, name: 'Alice', major: 'Computer Science' },
    { id: 2, name: 'Bob', major: 'Mechanical Engineering' },
    { id: 3, name: 'Charlie', major: 'Physics' }
];
let nextId = 4;


// --- API Routes ---

// Get all students
app.get('/students', (req, res) => {
    res.json(students);
});

// Get a single student by their ID
app.get('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);

    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
});

// Create a new student
app.post('/students', (req, res) => {
    const { name, major } = req.body;

    if (!name || !major) {
        return res.status(400).json({ message: 'Name and major are required' });
    }

    const newStudent = { id: nextId++, name, major };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// Update a student's information
app.put('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex(s => s.id === studentId);

    if (studentIndex === -1) {
        return res.status(404).json({ message: 'Student not found' });
    }

    const { name, major } = req.body;
    if (!name || !major) {
        return res.status(400).json({ message: 'Name and major are required' });
    }

    const updatedStudent = { id: studentId, name, major };
    students[studentIndex] = updatedStudent;
    res.json(updatedStudent);
});

// Delete a student
app.delete('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex(s => s.id === studentId);

    if (studentIndex === -1) {
        return res.status(404).json({ message: 'Student not found' });
    }

    students.splice(studentIndex, 1);
    res.status(200).json({ message: 'Student deleted successfully' });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
