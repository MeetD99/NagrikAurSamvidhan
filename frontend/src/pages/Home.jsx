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
import IndiaMap from '../components/IndiaMap';

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
    
  return (
    <>
        <Carousel autoPlay={true} emulateTouch={true} showStatus={false} infiniteLoop={true} renderIndicator={false} showThumbs={false}>
            <div className="carousel-images">
                <img src="https://cbpssubscriber.mygov.in/assets/uploads/juGajmc1gOVBUtt5?88" alt="" />
            </div>
            <div className="carousel-images">
                <img src="https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2024/08/202408281653611949.jpg" alt="" />
            </div>
            <div className="carousel-images">
                <img src="https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2024/08/202408141727527543.jpg" alt="" />
            </div>
        </Carousel>

        <div className="learn-container">
            <h1>Learn about the Constitution of India!</h1>
            <div className="slider-container">
                <Slider {...settings}>
                    <div className='card-container'>
                        <img src={Img1} alt="" />
                    </div>
                    <div className='card-container'>
                        <img src={Img2} alt="" />
                    </div>
                    <div className='card-container'>
                        <img src={Img3} alt="" />
                    </div>
                    <div className='card-container'>
                        <img src={Img4} alt="" />
                    </div>
                    <div className='card-container'>
                        <img src={Img5} alt=""/>
                    </div>
                </Slider>
            </div>
            
        </div>
        <div className="practice-container">
            <h1>Practice your skills!</h1> 
        </div>

        {/* <IndiaMap /> */}
    </>
  )
}

export default Home