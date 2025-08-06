import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-4">
          Welcome to FoodieHub 🍔
        </h1>
        <p className="text-gray-700 text-center">
          Your delicious journey starts here. Build your menu, place orders, and enjoy!
        </p>
        <div className="mt-6 text-center">
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;