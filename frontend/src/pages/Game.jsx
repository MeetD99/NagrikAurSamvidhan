import React, { useState } from 'react';
import FlipCard from '../components/FlipCard';  // Assuming FlipCard component is in the same directory
import WordSearch from '../components/WordSearch';  // Assuming WordSearch component is in the same directory
import flipcard from '../assets/flipcard.jpg'
import wordsearch from '../assets/wordsearch.jpg'

export default function Game() {
  const [selectedGame, setSelectedGame] = useState(null);

  // Function to handle game selection
  const handleGameSelection = (game) => {
    setSelectedGame(game);  // Set the selected game
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {/* Conditional rendering based on the selected game */}
      {!selectedGame ? (
        <div className='game-select'>
          <h2>Select the game you want to play</h2>
          <p>Choose from one of the two exciting games below</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <div onClick={() => handleGameSelection('flipcard')} className='game-card'>
              <img src={flipcard}/>
              <div className='game-info'>
                <h3>Flip Card</h3>
                <p>Test your memory with a fun card-flipping game!</p>
              </div>
            </div>
            <div onClick={() => handleGameSelection('wordsearch')} className='game-card'>
              <img src={wordsearch}/>
              <div className='game-info'>
                <h3>Word Search</h3>
                <p>Find hidden words in this challenging word search game!</p>
              </div>
            </div>
          </div>
        </div>
      ) : selectedGame === 'flipcard' ? (
        <FlipCard />  
      ) : (
        <WordSearch keywords={["EQUALITY", "JUSTICE", "LAW", "EDUCATION"]} />
      )}
    </div>
  );
}
