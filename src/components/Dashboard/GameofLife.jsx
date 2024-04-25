import React, { useState, useEffect } from 'react';
import Grid from '../Grid/Grid';
import './GameOfLife.css';

const GameOfLife = () => {
  const [gridNames, setGridNames] = useState([]);
  const [numRows, setNumRows] = useState(20);
  const [numCols, setNumCols] = useState(20);
  const [newGridName, setNewGridName] = useState('');
  const [activeGridIndex, setActiveGridIndex] = useState(null);

  useEffect(() => {
    const savedGridNames = JSON.parse(localStorage.getItem('gridNames'));
    if (savedGridNames) {
      setGridNames(savedGridNames);
    }
  }, []);

  const handleNumRowsChange = (event) => {
    const value = parseInt(event.target.value);
    setNumRows(value > 0 ? value : 1);
  };

  const handleNumColsChange = (event) => {
    const value = parseInt(event.target.value);
    setNumCols(value > 0 ? value : 1);
  };

  const handleGridNameChange = (event) => {
    setNewGridName(event.target.value);
  };

  const handleAddGrid = () => {
    if (newGridName.trim() !== '') {
      setGridNames([...gridNames, newGridName]);
      setNewGridName('');
      localStorage.setItem('gridNames', JSON.stringify([...gridNames, newGridName]));
    }
  };

  const handleGridClick = (index) => {
    setActiveGridIndex(index === activeGridIndex ? null : index);
  };

  return (
    <div>
      <div className='input-div'>
        <div className='rows-div'>
          <label htmlFor="numRowsInput">Rows:</label>
          <input
            type="number"
            id="numRowsInput"
            value={numRows}
            onChange={handleNumRowsChange}
          />
        </div>
        <div className='columns-div'>
          <label htmlFor="numColsInput">Columns:</label>
          <input
            type="number"
            id="numColsInput"
            value={numCols}
            onChange={handleNumColsChange}
          />
        </div>
      </div>
      <div className='grid-name-input'>
          <label htmlFor="gridNameInput">Grid Name:</label>
          <input
            type="text"
            id="gridNameInput"
            value={newGridName}
            onChange={handleGridNameChange}
          />
          <button onClick={handleAddGrid} className='addGrid-button'>Add Grid</button>
        </div>
      {gridNames.map((name, index) => (
        <div key={index}>
          <h2
            className={`grid-name ${activeGridIndex === index ? 'active' : ''}`}
            onClick={() => handleGridClick(index)}
          >
            {name}
          </h2>
          {activeGridIndex === index && <Grid numRows={numRows} numCols={numCols} />}
        </div>
      ))}
    </div>
  );
};

export default GameOfLife;
