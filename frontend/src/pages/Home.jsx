import React, { useState } from 'react'
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import Img1 from '../assets/Fundamental Rights/1.png'
import Img2 from '../assets/Fundamental Rights/2.png'
import Img3 from '../assets/Fundamental Rights/3.png'
import Img4 from '../assets/Fundamental Rights/4.png'
import Img5 from '../assets/Fundamental Rights/5.png'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FlipCard from '../components/FlipCard';  // Assuming FlipCard component is in the same directory
import WordSearch from '../components/WordSearch';  // Assuming WordSearch component is in the same directory
import flipcard from '../assets/flipcard.jpg'
import wordsearch from '../assets/wordsearch.jpg'

const Home = () => {
    var settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
    }

    const currentUser = useSelector((state) => state.user.user);
    const [selectedGame, setSelectedGame] = useState(null);
    const list_kw = ["PREAMBLE", "PRINCIPLES", "EQUALITY", "JUSTICE", "LAW", "EDUCATION", "ARTICLE", "JUDICIARY", "UNION", "SUPREME", 
        "PARLIAMENT", "SECULAR", "FEDERAL", "CITIZEN", "ELECTION"];
      const getRandomKeywords = () => {
        // Shuffle the array using the Fisher-Yates algorithm
        for (let i = list_kw.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [list_kw[i], list_kw[j]] = [list_kw[j], list_kw[i]]; // Swap elements
        }
    
        // Return the first 'numValues' items
        return list_kw.slice(0, 4);
      }
      // Function to handle game selection
      const handleGameSelection = (game) => {
        setSelectedGame(game);  // Set the selected game
      };
    
  return (
    <>
        <Carousel autoPlay={true} emulateTouch={true} showStatus={false} infiniteLoop={true} renderIndicator={false} showThumbs={false}>
            <div className="carousel-images">
                <img src="https://res.cloudinary.com/di1qhxfqv/image/upload/v1725573120/i63nspj88z4jrdhdgc9d.png" alt="" />
            </div>
            <div className="carousel-images">
                <img src="https://res.cloudinary.com/di1qhxfqv/image/upload/v1725573120/blkp8yf4ha3osntyz64w.png" alt="" />
            </div>
            <div className="carousel-images">
                <img src="https://res.cloudinary.com/di1qhxfqv/image/upload/v1725573120/brhcp8qdegt0lfblvnwv.png" alt="" />
            </div>
        </Carousel>

        <div className="learn-container">
            <h1>Learn about the Constitution of India!</h1>
            <div className="slider-container">
                <Slider {...settings}>
                    <Link to={currentUser? "/learn/rights" : "/signup"}>
                        <div className='card-container'>
                            <img src={Img1} alt="" />
                        </div>
                    </Link>
                    <Link to={currentUser? "/learn/duties" : "/signup"}>
                        <div className='card-container'>
                            <img src={Img2} alt="" />
                        </div>
                    </Link>
                    <Link to={currentUser? "/learn/preamble" : "/signup"}>
                        <div className='card-container'>
                            <img src={Img3} alt="" />
                        </div>
                    </Link>
                    <Link to={currentUser? "/learn/principles" : "/signup"}>
                        <div className='card-container'>
                            <img src={Img4} alt="" />
                        </div>
                    </Link>
                    <Link to={currentUser? "/learn/union" : "/signup"}>
                        <div className='card-container'>
                            <img src={Img5} alt="" />
                        </div>
                    </Link>
                </Slider>
            </div>
            
        </div>
        <div className="practice-container">
            <h1>Practice your skills!</h1> 
        
        {!selectedGame ? (
            <div className='game-select'>
            <h2>Come test your Knowledge!</h2>
            <p>Choose from one of the two exciting games given below!</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <div onClick={() => handleGameSelection('flipcard')} className='game-card-home'>
                    <img src={flipcard}/>
                    <div className='game-info-home'>
                        <h3 style={{textAlign: "center"}}>Flip Card</h3>
                    </div>
                    </div>
                    <div onClick={() => handleGameSelection('wordsearch')} className='game-card-home'>
                    <img src={wordsearch}/>
                    <div className='game-info-home'>
                        <h3 style={{textAlign: "center"}}>Word Search</h3>
                    </div>
                    </div>
                </div>
            </div>
        ) : selectedGame === 'flipcard' ? (
            <FlipCard />  
        ) : (
            <WordSearch keywords={getRandomKeywords()} />
        )}
        </div>

        
    </>
  )
}

export default Home