import React, { useState, useEffect } from 'react';
import Card from '../components/Card';

export default function FlipCard() {
  // Define key-value pairs
  const keyValuePairs = [
    { key: "Right to Equality", value: "All individuals are treated equally before the law, without discrimination." },
    { key: "Right to Freedom of Speech", value: "Everyone has the right to express their opinions and ideas freely." },
    { key: "Right to Freedom of Religion", value: "Each person is free to follow and practice any religion of their choice." },
    { key: "Right to Education", value: "Every child has the right to free and compulsory education up to a certain age." },
    { key: "Right to Privacy", value: "Individuals have the right to protect their personal information from public intrusion." },
    { key: "Right Against Exploitation", value: "No one can be forced into labor or exploitation, including child labor." },
    { key: "Right to Constitutional Remedies", value: "Citizens can approach the courts if their rights are violated." },
    { key: "", value: ""}
    // Add more key-value pairs as needed
  ];


  // Flatten the key-value pairs and shuffle them
  const generateShuffledCards = () => {
    const cards = keyValuePairs.flatMap((pair, index) => [
      { id: `${index}-key`, content: pair.key, pairId: index, isMatched: false },
      { id: `${index}-value`, content: pair.value, pairId: index, isMatched: false }
    ]).sort(() => Math.random() - 0.5); // Shuffle cards

    return cards;
  };

  const [cards, setCards] = useState(generateShuffledCards);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const handleCardClick = (index) => {
    if (selectedCards.length === 2 || selectedCards.includes(index) || cards[index].isMatched) return;

    const newSelectedCards = [...selectedCards, index];
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
      const [first, second] = newSelectedCards;
      if (cards[first].pairId === cards[second].pairId && cards[first].id !== cards[second].id) {
        setMatchedCards([...matchedCards, first, second]);
      }
    }
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [first, second] = selectedCards;
      if (cards[first].pairId !== cards[second].pairId || cards[first].id === cards[second].id) {
        setTimeout(() => setSelectedCards([]), 1000); // No match: flip back after delay
      } else {
        setSelectedCards([]); // Match: clear selected cards
      }
    }
  }, [selectedCards, cards]);

  useEffect(() => {
    const newCards = cards.map((card, index) =>
      matchedCards.includes(index) ? { ...card, isMatched: true } : card
    );
    setCards(newCards);
  }, [matchedCards]);

  return (
    <>
    <div className='score'>
      <p>Score : {matchedCards.length/2} / 8</p>
    </div>
    <div className="game">
      <div className="grid">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardClick(index)}
            isFlipped={selectedCards.includes(index) || card.isMatched}
            isMatched={card.isMatched}
            image={index+1}
          />
        ))}
      </div>
    </div>

  </>
  );
}