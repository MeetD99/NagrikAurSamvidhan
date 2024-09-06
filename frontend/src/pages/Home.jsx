import React from 'react'
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
import WordSearch from '../components/WordSearch';

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
        </div>

        {/* <WordSearch keywords={["EQUALITY", "JUSTICE", "LAW", "EDUCATION"]} /> */}
    </>
  )
}

export default Home