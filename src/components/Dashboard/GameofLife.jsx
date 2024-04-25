import React, { useState, useEffect, useCallback } from 'react';
import Grid from '../Grid/Grid';
import './GameOfLife.css';

const GameOfLife = () => {
  const [gridData, setGridData] = useState({
    names: [],
    numRows: 20,
    numCols: 20,
    newGridName: '',
    activeGridIndex: null,
    editedGridName: '',
    isEditing: false,
    editedIndex: null,
  });

  useEffect(() => {
    const savedGridNames = JSON.parse(localStorage.getItem('gridNames'));
    if (savedGridNames) {
      setGridData((prevData) => ({
        ...prevData,
        names: savedGridNames,
      }));
    }
  }, []);

  const handleNumRowsChange = useCallback((event) => {
    const value = parseInt(event.target.value);
    setGridData((prevData) => ({
      ...prevData,
      numRows: value > 0 ? value : 1,
    }));
  }, []);

  const handleNumColsChange = useCallback((event) => {
    const value = parseInt(event.target.value);
    setGridData((prevData) => ({
      ...prevData,
      numCols: value > 0 ? value : 1,
    }));
  }, []);

  const handleNewGridNameChange = useCallback((event) => {
    const value = event.target.value;
    setGridData((prevData) => ({
      ...prevData,
      newGridName: value,
    }));
  }, []);

  const handleAddGrid = useCallback(() => {
    const { names, newGridName } = gridData;
    if (newGridName.trim() !== '') {
      const updatedNames = [...names, newGridName];
      setGridData((prevData) => ({
        ...prevData,
        names: updatedNames,
        newGridName: '',
      }));
      localStorage.setItem('gridNames', JSON.stringify(updatedNames));
    }
  }, [gridData]);

  const handleEditGridNameSubmit = useCallback((index) => {
    const { names, editedGridName } = gridData;
    if (editedGridName.trim() !== '') {
      const updatedNames = [...names];
      updatedNames[index] = editedGridName;
      setGridData((prevData) => ({
        ...prevData,
        names: updatedNames,
        editedGridName: '',
        isEditing: false,
        editedIndex: null,
      }));
      localStorage.setItem('gridNames', JSON.stringify(updatedNames));
    }
  }, [gridData]);

  const handleGridNameClick = useCallback((index) => {
    setGridData((prevData) => ({
      ...prevData,
      activeGridIndex: index === prevData.activeGridIndex ? null : index,
      isEditing: false,
      editedIndex: null,
    }));
  }, []);

  const handleEditGridNameClick = useCallback((name, index) => {
    setGridData((prevData) => ({
      ...prevData,
      editedGridName: name,
      isEditing: true,
      editedIndex: index,
    }));
  }, []);

  return (
    <div>
      <div className='border border-bottom pb-4'>
        <div className='input-div'>
          <div className='rows-div'>
            <label htmlFor="numRowsInput">Rows:</label>
            <input
              type="number"
              id="numRowsInput"
              value={gridData.numRows}
              onChange={handleNumRowsChange}
            />
          </div>
          <div className='columns-div'>
            <label htmlFor="numColsInput">Columns:</label>
            <input
              type="number"
              id="numColsInput"
              value={gridData.numCols}
              onChange={handleNumColsChange}
            />
          </div>
        </div>
        <div className='grid-name-input'>
          <label htmlFor="gridNameInput">Grid Name:</label>
          <input
            type="text"
            id="gridNameInput"
            value={gridData.newGridName}
            onChange={handleNewGridNameChange}
          />
          <button onClick={handleAddGrid} className='addGrid-button'>Add Grid</button>
        </div>
      </div>
      {gridData.names.map((name, index) => (
        <div key={index}>
          <h2
            className={`grid-name ${gridData.activeGridIndex === index ? 'active' : ''}`}
            onClick={() => handleGridNameClick(index)}
          >
            {name}
          </h2>
          <div className='text-center'>
            {(gridData.isEditing && gridData.editedIndex === index) ? (
              <div className='text-center my-4'>
                <input
                  type="text"
                  value={gridData.editedGridName}
                  onChange={(e) => setGridData((prevData) => ({
                    ...prevData,
                    editedGridName: e.target.value,
                  }))}
                />
                <div>
                  <button onClick={() => handleEditGridNameSubmit(index)} className='mt-4 submit-button'>Submit</button>
                </div>
              </div>
            ) : (
              <div className='text-center'>
                <button onClick={() => handleEditGridNameClick(name, index)} className='edit-button my-3' >Edit grid name</button>
              </div>
            )}
          </div>
          {gridData.activeGridIndex === index && (
            <Grid
              numRows={gridData.numRows}
              numCols={gridData.numCols}
              index={index}
              editedGridName={gridData.editedGridName}
              setEditedGridName={(value) => setGridData((prevData) => ({
                ...prevData,
                editedGridName: value,
              }))}
              handleEditGridName={handleEditGridNameSubmit}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default GameOfLife;
