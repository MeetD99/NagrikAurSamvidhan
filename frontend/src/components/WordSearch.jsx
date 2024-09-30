
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

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

const WordSearch = ({ keywords, meanings }) => {
  const [grid, setGrid] = useState(generateGrid(10, keywords));
  const [selection, setSelection] = useState([]);
  const [selectedWord, setSelectedWord] = useState('');
  const [foundKeywords, setFoundKeywords] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [preGameKeywords, setPreGameKeywords] = useState([]);
  const [gameKeywords, setGameKeywords] = useState([]);
  const [timeLeft, setTimeLeft] = useState(45);
  const isDragging = useRef(false);
  const startRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const shuffledKeywords = [...keywords].sort(() => 0.5 - Math.random()).slice(0, 5);
    setPreGameKeywords(shuffledKeywords);
  }, [keywords]);

  useEffect(() => {
    if (timeLeft > 0 && !gameStarted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameStarted) {
      setGameStarted(true);
      const random3Keywords = preGameKeywords.sort(() => {0.5 - Math.random()}).slice(0, 3);
      setGameKeywords(random3Keywords);
      setGrid(generateGrid(10, random3Keywords));
    }
  }, [timeLeft, gameStarted, preGameKeywords]);

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
        const rowRange = row >= startRow ? [startRow, row] : [row, startRow];
        const colRange = col >= startCol ? [startCol, col] : [col, startCol];
        for (let r = rowRange[0]; r <= rowRange[1]; r++) {
          for (let c = colRange[0]; c <= colRange[1]; c++) {
            newSelection.push([r, c]);
          }
        }
      } else {
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

      if (keywords.includes(word)) {
        if (!foundKeywords.includes(word)) {
          setFoundKeywords([...foundKeywords, word]);
        }
      }
      setSelection([]);
    }
  };

  const checkGameCompletion = () => {
    return foundKeywords.length === 3;
  };

  const handleRestart = () =>{
    setGrid(generateGrid(10, keywords));
    setFoundKeywords([]);
    setTimeLeft(45);
    setGameStarted(false);
  }

  return (
    <div>
      {!gameStarted ? (
        <div className='word-search-main'>
          <h1>Prepare for Word Search!</h1>
          <p>You have 45 seconds to review these words and their meanings:</p>
          <div className='words-container'>
            {preGameKeywords.map((word, index) => (
              <div key={index} className='words'>
                <strong>{word}:</strong> {meanings[word]}
              </div>
            ))}
          </div>
          <p className='word-timer'>Time Left: {timeLeft}s</p>
        </div>
      ) : (
        <div>
          <h1>Word Search!</h1>
          {checkGameCompletion() ? (
            <div className='results-wordsearch'>
              <p>Congratulations! You found all the words!</p>
              <button onClick={handleRestart}>Restart the Game!</button>
              <button onClick={()=> {
                navigate("/")
              }}>Home</button>
            </div>
            
          ) : (
            <div className='grid-main'>
              <p>Find the words based on the given meanings:</p>
              {
              gameKeywords.map((word, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: foundKeywords.includes(word) ? 'lime' : 'inherit',
                    padding: '5px 10px',
                    margin: '5px',
                  }}
                  className='meaning-div'
                >
                  <strong>Meaning:</strong> {meanings[word]}
                </div>
              ))}
              <div className="grid-container">
              <div
                onMouseUp={handleMouseUp}
                style={{
                  display: 'grid',
                  objectPosition: 'center',
                  gridTemplateColumns: `repeat(${grid.length}, 50px)`,
                  gap: '1px',
                }}
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
                        backgroundColor: selection.some(([r, c]) => r === rowIndex && c === colIndex)
                          ? 'lightblue'
                          : 'white',
                        cursor: 'pointer',
                        userSelect: 'none'
                      }}
                    >
                      {cell}
                    </div>
                  ))
                )}
              </div>
              </div>
              
              <p>Score: {foundKeywords.length}/{gameKeywords.length}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WordSearch;

