export const generateEmptyGrid = (rows, cols) => {
    const grid = [];
    for (let i = 0; i < rows; i++) {
      grid.push(Array.from(Array(cols), () => 0));
    }
    return grid;
};