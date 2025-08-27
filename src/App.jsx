// src/App.jsx

import React from 'react';
import TodoList from './day-8-task.jsx'; // Import your component
import './App.css'; // Optional: for basic styling

function App() {
  return (
    <div className="App">
      <TodoList /> {/* Render your component here */}
    </div>
  );
}

export default App;