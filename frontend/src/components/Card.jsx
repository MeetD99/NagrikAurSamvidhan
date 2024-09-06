import React from 'react';
import _1 from '../assets/1.webp';
import _2 from '../assets/2.webp';
import _3 from '../assets/3.webp';
import _4 from '../assets/4.webp';
import _5 from '../assets/5.webp';
import _6 from '../assets/6.webp';
import _7 from '../assets/7.webp';
import _8 from '../assets/8.webp';
import _9 from '../assets/9.webp';
import _10 from '../assets/10.webp';
import _11 from '../assets/11.webp';
import _12 from '../assets/12.webp';
import _13 from '../assets/13.webp';
import _14 from '../assets/14.webp';
import _15 from '../assets/15.webp';
import _16 from '../assets/16.webp';
import jocker from '../assets/jocker.jpg';

const images = {
  1: _1,
  2: _2,
  3: _3,
  4: _4,
  5: _5,
  6: _6,
  7: _7,
  8: _8,
  9: _9,
  10: _10,
  11: _11,
  12: _12,
  13: _13,
  14: _14,
  15: _15,
  16: _16
};

function Card({ card, onClick, isFlipped, isMatched, image }) {
  return (
    <div className={`card ${isFlipped || isMatched ? 'flipped' : ''}`} onClick={onClick}>
      <div className="card-inner">
        {/* Use the images object to map to the imported image */}
        <div className="card-face front">
          <img src={images[image]}/>
        </div>
        <div className="card-face back">
          {card.content == ""? <img src={jocker} /> : card.content} 
        </div>
      </div>
    </div>
  );
}

export default Card;
