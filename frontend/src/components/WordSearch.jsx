import React, { useState, useRef } from 'react';

// Helper function to create a random grid of letters
const generateGrid = (size, keywords) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const grid = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => '')
  );

  const placeWord = (word) => {
    const directions = [
      { dx: 1, dy: 0 },   // Horizontal
      { dx: 0, dy: 1 },   // Vertical
      { dx: 1, dy: 1 },   // Diagonal down-right
      { dx: 1, dy: -1 }   // Diagonal down-left
    ];

    const randomDirection = () => directions[Math.floor(Math.random() * directions.length)];

    for (let attempt = 0; attempt < 100; attempt++) {
      const direction = randomDirection();
      const startRow = Math.floor(Math.random() * size);
      const startCol = Math.floor(Math.random() * size);
      const endRow = startRow + direction.dy * (word.length - 1);
      const endCol = startCol + direction.dx * (word.length - 1);

      // Check if the word fits in the grid
      if (endRow >= 0 && endRow < size && endCol >= 0 && endCol < size) {
        let canPlace = true;

        for (let i = 0; i < word.length; i++) {
          const r = startRow + direction.dy * i;
          const c = startCol + direction.dx * i;
          if (grid[r][c] !== '' && grid[r][c] !== word[i]) {
            canPlace = false;
            break;
          }
        }

        if (canPlace) {
          for (let i = 0; i < word.length; i++) {
            const r = startRow + direction.dy * i;
            const c = startCol + direction.dx * i;
            grid[r][c] = word[i];
          }
          return true; // Word placed successfully
        }
      }
    }
    return false; // Failed to place the word
  };

  // Place each keyword in the grid
  keywords.forEach((word) => placeWord(word.toUpperCase()));

  // Fill remaining empty spaces with random letters
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === '') {
        grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  return grid;
};

// Word search component
const WordSearch = ({ keywords }) => {
    const [grid, setGrid] = useState(generateGrid(10, keywords));
    const [selection, setSelection] = useState([]);
    const [selectedWord, setSelectedWord] = useState('');
    const [foundKeywords, setFoundKeywords] = useState([]);
    const isDragging = useRef(false);
    const startRef = useRef(null);

  const handleMouseDown = (row, col) => {
    isDragging.current = true;
    startRef.current = [row, col];
    setSelection([[row, col]]);
  };

  const handleMouseOver = (row, col) => {
    if (isDragging.current) {
      const startRow = startRef.current[0];
      const startCol = startRef.current[1];
      
      const newSelection = [];
      
      if (row === startRow || col === startCol) {
        // Handle horizontal and vertical selections
        const rowRange = row >= startRow ? [startRow, row] : [row, startRow];
        const colRange = col >= startCol ? [startCol, col] : [col, startCol];
        
        for (let r = rowRange[0]; r <= rowRange[1]; r++) {
          for (let c = colRange[0]; c <= colRange[1]; c++) {
            newSelection.push([r, c]);
          }
        }
      } else {
        // Handle diagonal selections
        const rowDiff = Math.abs(row - startRow);
        const colDiff = Math.abs(col - startCol);
        if (rowDiff === colDiff) {
          const rowStep = row > startRow ? 1 : -1;
          const colStep = col > startCol ? 1 : -1;
          for (let i = 0; i <= rowDiff; i++) {
            newSelection.push([startRow + i * rowStep, startCol + i * colStep]);
          }
        }
      }
      
      setSelection(newSelection);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (selection.length > 1) {
      const word = selection.map(([r, c]) => grid[r][c]).join('');
      setSelectedWord(word);
      // Check if the selected word is in the list of keywords
      if (keywords.includes(word)) {
        if (!foundKeywords.includes(word)) {
          setFoundKeywords([...foundKeywords, word]);
        }
      } else {
      }
      setSelection([]);
    }
  };

  return (
    <>
        <h1>Word Search!</h1>
        <ul style={{listStyle:"none"}}>
          <li>Wecome to Word Search! You have to find all the words listed below</li>
          <li>To select a word, click on it and drag the mouse on the whole word while holding the click.</li>
        </ul>
      {keywords.map((kw, id) => (
        <div
          key={id}
          style={{
            display: 'inline-block',
            padding: '5px 10px',
            margin: '5px',
            backgroundColor: foundKeywords.includes(kw) ? 'lime' : 'inherit'
          }}
        >
          {kw}
        </div>
      ))}
      <div
        onMouseUp={handleMouseUp}
        style={{ display: 'grid', gridTemplateColumns: `repeat(${grid.length}, 50px)`, gap: '1px' }}
        className='grid-container-wordsearch'
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
              onMouseOver={() => handleMouseOver(rowIndex, colIndex)}
              style={{
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #ccc',
                backgroundColor: selection.some(([r, c]) => r === rowIndex && c === colIndex) ? 'lightblue' : 'white',
                cursor: 'pointer',
                userSelect: 'none'
              }}
            >
              {cell}
            </div>
          ))
        )}
      </div>
    </>
    
  );
};

export default WordSearch;