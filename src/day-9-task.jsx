import React, { useState, useEffect } from 'react';

function StudentDirectory() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <p>Loading students...</p>;
  }

  return (
    <div>
      <h1>Student Directory</h1>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            {student.name} - ({student.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentDirectory;