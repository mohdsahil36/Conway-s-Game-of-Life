import React, { useState, useEffect, useCallback } from 'react';
import { generateEmptyGrid } from '../../utils/utils';

const Grid = ({ numRows, numCols }) => {
  const [grid, setGrid] = useState(() => generateEmptyGrid(numRows, numCols));
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setGrid(generateEmptyGrid(numRows, numCols));
  }, [numRows, numCols]);

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
      <div className='buttons-div'>
        <button onClick={handleRunClick} className='start-button'>{running ? 'Pause' : 'Start'}</button>
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

export default Grid;
