// src/App.jsx

import React from 'react';
import ProductList from './ProductList.jsx';

function App() {
  // Add a background color to the whole page to make the cards pop
  return (
    <div className="bg-gray-100 min-h-screen">
      <ProductList />
    </div>
  );
}

export default App;