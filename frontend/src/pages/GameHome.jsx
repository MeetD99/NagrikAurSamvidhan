import React, { useState } from 'react';
import FlipCard from '../components/FlipCard';  // Assuming FlipCard component is in the same directory
import WordSearch from '../components/WordSearch';  // Assuming WordSearch component is in the same directory
import flipcard from '../assets/flipcard.jpg'
import wordsearch from '../assets/wordsearch.jpg'

export default function GameHome() {
  const [selectedGame, setSelectedGame] = useState();
  const list_kw = ["PREAMBLE", "PRINCIPLES", "EQUALITY", "JUSTICE", "LAW", "EDUCATION", "ARTICLE", "JUDICIARY", "UNION", "SUPREME", 
    "PARLIAMENT", "SECULAR", "FEDERAL", "CITIZEN", "ELECTION"];
    const meanings_kw = {
      "PREAMBLE": "The introduction of the Constitution that explains its purpose and goals.",
      "PRINCIPLES": "Basic rules or ideas that guide how a country or people should act.",
      "EQUALITY": "Treating everyone the same, giving them the same rights and opportunities.",
      "JUSTICE": "Fairness; ensuring everyone gets what they deserve.",
      "LAW": "Rules made by the government that everyone must follow.",
      "EDUCATION": "The process of learning new things to grow and succeed.",
      "ARTICLE": "A specific section of the Constitution that explains certain rules or rights.",
      "JUDICIARY": "The system of courts and judges that interprets and enforces laws.",
      "UNION": "The coming together of states or regions to form a country.",
      "SUPREME": "The highest level of something, like the Supreme Court being the highest court.",
      "PARLIAMENT": "The group of elected people who make laws for the country.",
      "SECULAR": "Not connected to any religion; treating all religions equally.",
      "FEDERAL": "A system where power is shared between the central government and states.",
      "CITIZEN": "A person who belongs to a country and has rights and duties in it.",
      "ELECTION": "The process where people vote to choose their leaders."
  };
  
  // Function to handle game selection
  const handleGameSelection = (game) => {
    setSelectedGame(game);  // Set the selected game
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {/* Conditional rendering based on the selected game */}
      {!selectedGame ? (
        <div className='game-select'>
          <h2>Come test your Knowledge!</h2>
          <p>Choose from one of the two exciting games given below!</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <div onClick={() => handleGameSelection('monopoly')} className='game-card'>
                <img src={flipcard}/>
                <div className='game-info'>
                    <h3>Constitutionopoly</h3>
                    <p>Play this custom monopoly with your friends online!</p>
                </div>
                </div>
                <div onClick={() => handleGameSelection('samvidhan-saga')} className='game-card'>
                <img src={flipcard}/>
                <div className='game-info'>
                    <h3>Samvidhan ki Nagri</h3>
                    <p>Engage in this 2d Roleplay game that takes you around different villages with different scenarios.</p>
                </div>
                </div>
            <div onClick={() => handleGameSelection('flipcard')} className='game-card'>
              <img src={flipcard}/>
              <div className='game-info'>
                <h3>Flip the Cards!</h3>
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
      ) : selectedGame === 'wordsearch' ?(
        <WordSearch keywords={list_kw} meanings={meanings_kw}/>
      ) : selectedGame === 'samvidhan-saga' ? (<div> Samvidhan Saga</div>) : selectedGame === 'monopoly' ? (<div>Consti-tu-nopoly</div>) : (<>Invalid Choice of Game!</>)}
    </div>
  );
}
