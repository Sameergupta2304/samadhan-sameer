import React, { useState } from 'react';

const App = () => {
  // useState for counter
  const [count, setCount] = useState(0);
  
  // useState for text input
  const [text, setText] = useState('');
  
  // useState for user name
  const [name, setName] = useState('Sachin Lodhi');

  // Counter functions
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  // Input handler
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          React useState & Input Handling Demo
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Counter Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Interactive Counter
            </h2>
            
            {/* Counter Display */}
            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-blue-600 mb-4">
                {count}
              </div>
              <p className="text-gray-600">
                Current Count: <span className="font-semibold">{count}</span>
              </p>
            </div>
            
            {/* Counter Controls */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={decrement}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                - Decrease
              </button>
              
              <button
                onClick={reset}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Reset
              </button>
              
              <button
                onClick={increment}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                + Increase
              </button>
            </div>
            
            {/* Counter Status */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Status: 
                <span className={`font-semibold ml-2 ${
                  count > 0 ? 'text-green-600' : 
                  count < 0 ? 'text-red-600' : 
                  'text-gray-600'
                }`}>
                  {count > 0 ? 'Positive' : count < 0 ? 'Negative' : 'Zero'}
                </span>
              </p>
            </div>
          </div>

          {/* Live Text Preview Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Live Text Preview
            </h2>
            
            {/* Name Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name:
              </label>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>

            {/* Message Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Message:
              </label>
              <textarea
                value={text}
                onChange={handleTextChange}
                placeholder="Type your message here..."
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-colors"
              />
            </div>
            
            {/* Live Preview */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Live Preview:</h3>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {name.charAt(0).toUpperCase() || 'S'}
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-800">
                      {name || 'Anonymous User'}
                    </p>
                    <p className="text-xs text-gray-500">Just now</p>
                  </div>
                </div>
                
                <div className="text-gray-700">
                  {text || (
                    <span className="text-gray-400 italic">
                      Your message will appear here as you type...
                    </span>
                  )}
                </div>
              </div>
              
              {/* Character Count */}
              <div className="mt-3 text-sm text-gray-600">
                Characters: <span className="font-semibold">{text.length}</span>
                {text.length > 0 && (
                  <span className="ml-4">
                    Words: <span className="font-semibold">
                      {text.trim() ? text.trim().split(/\s+/).length : 0}
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Combined State Display */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Combined State Summary
          </h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600">Counter Value</p>
                <p className="text-2xl font-bold text-blue-600">{count}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Message Length</p>
                <p className="text-2xl font-bold text-green-600">{text.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">User Name</p>
                <p className="text-xl font-semibold text-purple-600">{name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
