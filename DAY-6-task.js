import React from 'react';

// Profile Card Component
const ProfileCard = ({ name, role, avatar, email, location }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-sm mx-auto">
      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <img 
          src={avatar} 
          alt={name}
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
        />
      </div>
      
      {/* Name and Role */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-blue-600 font-medium">{role}</p>
      </div>
      
      {/* Contact Info */}
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <span className="mr-2">📧</span>
          <span>{email}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">📍</span>
          <span>{location}</span>
        </div>
      </div>
      
      {/* Action Button */}
      <button className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
        View Profile
      </button>
    </div>
  );
};

// App Component - Demo Usage
const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Profile Card Component
      </h1>
      
      <ProfileCard
        name="Sachin Lodhi"
        role="Frontend Developer"
        avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        email="sachin.lodhi@example.com"
        location="Indore, India"
      />
    </div>
  );
};

export default App;
