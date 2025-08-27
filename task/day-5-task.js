const express = require('express');
const app = express();
const port = 3000;

const students = [
  { id: 1, name: 'sameer gupta', course: 'Computer Science' },
  { id: 2, name: 'saachin lodhi', course: 'AIDS' },
  { id: 3, name: 'aakash pal', course: 'EX' },
  { id: 4, name: 'sanjeev singh', course: 'ME' }
];

app.get('/api/students', (req, res) => {
  res.json(students);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
  console.log(`Access the student list at http://localhost:${port}/api/students`);
});
