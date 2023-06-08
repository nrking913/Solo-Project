import React, { useState, useEffect } from 'react';
import './App.css';
import Chart from 'chart.js/auto';
//create a stateful variable to handle things showing up only when clicked
const App = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    if (showDropdown) {
      const chartContainer = document.getElementById('chartContainer');
      const ctx = chartContainer.getContext('2d');
      
      //tried to implement the data from the api but really had a tough time
      const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Bitcoin Price',
            data: [10000, 12000, 11000, 9000, 9500, 10500],
            //set color to a relaxing blue
            borderColor: '#00bfff',
            fill: false,
          },
        ],
      };
      
      
      const options = {
        responsive: true,
        maintainAspectRatio: false,
      };
      
      // Build the new chart using the plugin
      new Chart(ctx, {
        type: 'line',
        data: data,
        options: options,
      });
    }
  }, [showDropdown]);
//use state to have some components show up when a button is clicked
  return (
    <div className="container">
      <div className="box">
        <h1 className="title">Crypto MinMax Tracker</h1>
        <button className="toggle-btn" onClick={handleClick}>
          Toggle Coin Data
        </button>
        
        {showDropdown && (
          <select className="dropdown">
            <option value="option1">1 Week</option>
            <option value="option2">1 Month</option>
            <option value="option3">1 Year</option>
          </select>
        )}

        <div className="chart-container">
          <canvas id="chartContainer"></canvas>
        </div>

        <div className="text-container">
          {showDropdown && (
          <p>Here is the data that you requested: If you wanted to maximize profits you should buy in April and sell in June. You would've made $1500</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
