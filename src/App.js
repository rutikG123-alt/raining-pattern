import React, { useEffect, useState } from 'react';
import './App.css';

// Define grid dimensions and colors
const GRID_ROWS = 15;
const GRID_COLS = 20;
const COLORS = ['#00FF00', '#FF00FF', '#00FFFF', '#FFFF00', '#FF5733', '#C70039', '#900C3F'];

function App() {
  const [matrix, setMatrix] = useState([]);

  useEffect(() => {
    // Initialize the grid
    const initialMatrix = Array.from({ length: GRID_ROWS }, () =>
      Array.from({ length: GRID_COLS }, () => '')
    );
    setMatrix(initialMatrix);

    // Update the rain effect every 150ms
    const interval = setInterval(() => {
      updateRain();
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Function to update the matrix rain
  const updateRain = () => {
    setMatrix((prevMatrix) => {
      const newMatrix = Array.from({ length: GRID_ROWS }, (_, rowIndex) =>
        Array.from({ length: GRID_COLS }, (_, colIndex) => {
          // Lower density by increasing randomness threshold
          if (Math.random() > 0.97) {  // Fewer drops with a higher threshold
            return COLORS[Math.floor(Math.random() * COLORS.length)];
          } else if (rowIndex > 0) {
            return prevMatrix[rowIndex - 1][colIndex]; // Move the color downwards
          }
          return ''; // Empty cell if no drop
        })
      );
      return newMatrix;
    });
  };

  return (
    <div className="container">
      <h1 className="title">Matrix Rain Effect</h1>
      <div className="grid">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className="cell"
                style={{ backgroundColor: cell || '#111' }} // Default dark background
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
