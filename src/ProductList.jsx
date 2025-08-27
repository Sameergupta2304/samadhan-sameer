// src/ProductList.jsx

import React from 'react';
import ProductCard from './ProductCard.jsx';

const products = [
  {
    id: 1,
    title: 'Modern Wireless Headphones',
    description: 'High-fidelity sound with a sleek, comfortable design.',
    price: '$129.99',
    imageUrl: 'https://placehold.co/600x400/3498db/ffffff?text=Headphones'
  },
  {
    id: 2,
    title: 'Smart Fitness Tracker',
    description: 'Monitor your activity, sleep, and stay connected on the go.',
    price: '$79.50',
    imageUrl: 'https://placehold.co/600x400/2ecc71/ffffff?text=Tracker'
  },
  {
    id: 3,
    title: 'Ergonomic Mechanical Keyboard',
    description: 'A satisfying typing experience for work and play.',
    price: '$155.00',
    imageUrl: 'https://placehold.co/600x400/e74c3c/ffffff?text=Keyboard'
  }
];

function ProductList() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-700">Featured Products</h1>
      {/* Grid container for the cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;