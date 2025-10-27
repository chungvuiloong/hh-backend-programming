import React from 'react';
import './App.css';
import LocationDisplay from './components/LocationDisplay';

function App() {
  return (
    <div>
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Friend List
        </h1>
        <LocationDisplay />
    </div>
  );
}

export default App;
