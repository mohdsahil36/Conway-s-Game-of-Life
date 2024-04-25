import React, { useState, useEffect, useCallback } from 'react';
import { generateEmptyGrid } from '../../utils/utils';
import './Dashboard.css';

const GameOfLife = () => {
  const [numRows, setNumRows] = useState(20);
  const [numCols, setNumCols] = useState(20);
  const [grid, setGrid] = useState(() => generateEmptyGrid(numRows, numCols));
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setGrid(generateEmptyGrid(numRows, numCols));
  }, [numRows, numCols]);

  const handleNumRowsChange = (event) => {
    const value = parseInt(event.target.value);
    setNumRows(value > 0 ? value : 1);
  };

  const handleNumColsChange = (event) => {
    const value = parseInt(event.target.value);
    setNumCols(value > 0 ? value : 1);
  };

  const toggleCell = (i, j) => {
    const newGrid = [...grid];
    newGrid[i][j] = newGrid[i][j] ? 0 : 1;
    setGrid(newGrid);
  };

  const handleRunClick = () => {
    setRunning(!running);
  };

  const handleClearClick = () => {
    setGrid(generateEmptyGrid(numRows, numCols));
  };

  const runSimulation = useCallback(() => {
    if (!running) {
      return;
    }

    setGrid((grid) => {
      return grid.map((row, i) =>
        row.map((col, j) => {
          const neighbors = [
            grid[i - 1]?.[j - 1],
            grid[i - 1]?.[j],
            grid[i - 1]?.[j + 1],
            grid[i]?.[j - 1],
            grid[i]?.[j + 1],
            grid[i + 1]?.[j - 1],
            grid[i + 1]?.[j],
            grid[i + 1]?.[j + 1],
          ]
            .filter((neighbor) => neighbor !== undefined)
            .reduce((acc, curr) => acc + curr, 0);

          if (col === 1 && (neighbors < 2 || neighbors > 3)) {
            return 0;
          } else if (col === 0 && neighbors === 3) {
            return 1;
          } else {
            return col;
          }
        })
      );
    });
  }, [running]);

  useEffect(() => {
    if (running) {
      const intervalId = setInterval(runSimulation, 200);
      return () => clearInterval(intervalId);
    }
  }, [running, runSimulation]);

  const gridTemplateColumns = `repeat(${numCols}, 20px)`;

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
      <div className='buttons-div'>
        <button onClick={handleRunClick} className='start-button'>{running ? 'Stop' : 'Start'}</button>
        <button onClick={handleClearClick} className='reset-button'>Clear</button>
      </div>
      <div className='grid-container' style={{ gridTemplateColumns: gridTemplateColumns }}>
        {grid.map((row, i) =>
          row.map((col, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => toggleCell(i, j)}
              className={col === 1 ? 'cell alive' : 'cell dead'}
            ></div>
          ))
        )}
      </div>
    </div>
  );
};

export default GameOfLife;
