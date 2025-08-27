// src/ProductCard.jsx

import React from 'react';

function ProductCard({ imageUrl, title, description, price }) {
  return (
    // Main card container with shadow, rounded corners, and a border
    <div className="border rounded-lg shadow-lg overflow-hidden max-w-sm bg-white">
      <img 
        className="w-full h-48 object-cover" 
        src={imageUrl} 
        alt={title} 
      />
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-base mb-4">{description}</p>
        <div className="font-bold text-2xl text-blue-600">{price}</div>
      </div>
    </div>
  );
}

export default ProductCard;
