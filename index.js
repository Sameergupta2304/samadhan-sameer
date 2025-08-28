/**
 * index.js
 * A complete, self-contained Express.js server for a Student CRUD API.
 * This file includes an in-memory database and all the necessary routes for
 * creating, reading, updating, and deleting student records.
 */

// 1. Import the Express framework
const express = require('express');

// 2. Initialize the Express application
const app = express();
const PORT = 3000;

// 3. Middleware Setup
// This is a crucial piece of middleware. It tells Express to automatically
// parse incoming request bodies that are in JSON format. Without this,
// `req.body` would be undefined in our POST and PUT handlers.
app.use(express.json());

// 4. In-Memory "Database"
// For this task, we use a simple JavaScript array to store our data.
// This means the data will be reset every time the server is restarted.
// In a real-world application, this would be replaced with a connection
// to a database like MongoDB, PostgreSQL, or MySQL.
let students = [
    { id: 1, name: 'Alice', major: 'Computer Science' },
    { id: 2, name: 'Bob', major: 'Mechanical Engineering' },
    { id: 3, name: 'Charlie', major: 'Physics' }
];

// A simple counter to ensure new students get a unique ID.
let nextId = 4;

// 5. Route Definitions

// --- HEALTH CHECK ROUTE ---
// A simple GET route at the root URL (/) to check if the server is alive.
app.get('/', (req, res) => {
    res.send('Welcome to the Student CRUD API!');
});

// --- [C]REATE A NEW STUDENT ---
// HTTP Method: POST
// Path: /students
// This route listens for POST requests to create a new student.
// The student's data (name and major) is expected in the request body as JSON.
app.post('/students', (req, res) => {
    // Destructure name and major from the request body
    const { name, major } = req.body;

    // Basic validation: Check if name and major were provided.
    if (!name || !major) {
        return res.status(400).json({ message: 'Error: Name and major are required.' });
    }

    // Create a new student object with a unique ID.
    const newStudent = {
        id: nextId++,
        name: name,
        major: major
    };

    // Add the new student to our in-memory database.
    students.push(newStudent);

    // Send a 201 "Created" status and the new student object back to the client.
    res.status(201).json(newStudent);
});

// --- [R]EAD ALL STUDENTS ---
// HTTP Method: GET
// Path: /students
// This route returns the entire list of students.
app.get('/students', (req, res) => {
    res.status(200).json(students);
});

// --- [R]EAD A SINGLE STUDENT BY ID ---
// HTTP Method: GET
// Path: /students/:id
// The ":id" is a URL parameter. Express captures its value in `req.params`.
app.get('/students/:id', (req, res) => {
    // URL parameters are strings, so we parse it to an integer for comparison.
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);

    if (student) {
        // If the student is found, send it back with a 200 OK status.
        res.status(200).json(student);
    } else {
        // If no student with that ID exists, send a 404 Not Found status.
        res.status(404).json({ message: 'Student not found' });
    }
});

// --- [U]PDATE AN EXISTING STUDENT ---
// HTTP Method: PUT
// Path: /students/:id
// This route updates the information for an existing student.
app.put('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const { name, major } = req.body;

    // Find the index of the student to update. `findIndex` is useful here.
    const studentIndex = students.findIndex(s => s.id === studentId);

    if (studentIndex !== -1) {
        // Basic validation for the new data.
        if (!name || !major) {
            return res.status(400).json({ message: 'Error: Name and major are required.' });
        }

        // Create the updated student object.
        const updatedStudent = { id: studentId, name, major };

        // Replace the old student object with the updated one in the array.
        students[studentIndex] = updatedStudent;

        // Send back the updated student object.
        res.status(200).json(updatedStudent);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

// --- [D]ELETE A STUDENT ---
// HTTP Method: DELETE
// Path: /students/:id
// This route removes a student from the database.
app.delete('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex(s => s.id === studentId);

    if (studentIndex !== -1) {
        // The `splice` method removes elements from an array.
        students.splice(studentIndex, 1);
        res.status(200).json({ message: 'Student deleted successfully' });
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});


// 6. Start the Server
// This tells the application to start listening for incoming HTTP requests
// on the specified port.
app.listen(PORT, () => {
    console.log(`Server is running and listening on http://localhost:${PORT}`);
});
