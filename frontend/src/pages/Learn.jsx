import {React, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import IndiaMap from '../components/IndiaMap';
import 'react-fancy-circular-carousel/FancyCarousel.css';
import FancyCarousel from 'react-fancy-circular-carousel';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import ProgressBar from '../components/ProgressBar';

const Learn = () => {
    const [focusElement, setFocusElement] = useState(0);
    const [learnTopic, setLearnTopic] = useState("rights");
    const { topic } = useParams(); // 'topic' will be the dynamic part of the URL
 
    const [images, setImages] = useState([]);
    const [info, setInfo] = useState([]);
    const [desc, setDesc] = useState([]);

    useEffect(() => {
        switch (topic) {
            case "rights":
                setLearnTopic("Fundamental Rights");
                setImages([
                    'https://res.cloudinary.com/di1qhxfqv/image/upload/v1725543657/Rights/rbmtl8etiqteq88et2a7.png',
                    'https://res.cloudinary.com/di1qhxfqv/image/upload/v1725543657/Rights/r9zsh5rgl6d2daugluh5.png',
                    'https://res.cloudinary.com/di1qhxfqv/image/upload/v1725543657/Rights/rsomcnea4j9tutjtfdd4.png',
                    'https://res.cloudinary.com/di1qhxfqv/image/upload/v1725543657/Rights/pwrhoyj0uw5hnpsennla.png',
                    'https://res.cloudinary.com/di1qhxfqv/image/upload/v1725543657/Rights/vpboiaiafgatpo5q8hnx.png',
                    'https://res.cloudinary.com/di1qhxfqv/image/upload/v1725543657/Rights/g30bj39knv4p1wt8tmzp.png',
                    'https://res.cloudinary.com/di1qhxfqv/image/upload/v1725543657/Rights/fdrkkd2rdfth7yqgxegb.png'
                ]);
                setInfo([
                    "Right to Freedom", "Right to Equality", "Right to Speech",
                    "Right against Exploitation", "Right to Education", "Right to Freedom of Religion", "Right to Constitutional Remedies."
                ]);
                setDesc([
                    "Article 19 of the Indian Constitution provides essential freedoms to citizens, including the right to freely express themselves, assemble peacefully, form associations or unions, move freely within the country, reside anywhere in India, and engage in any profession, trade, or business. However, these freedoms can be limited by reasonable restrictions set by the State for reasons such as maintaining national security, public order, and moral standards.",
                    "Article 16 of the Indian Constitution ensures equal opportunity for all citizens in public employment, prohibiting discrimination based on religion, race, caste, sex, descent, place of birth, or residence. It allows for laws that may set residency requirements for certain jobs and permits reservations for backward classes to address underrepresentation in state services. This article aims to uphold fairness in employment while accommodating measures to support disadvantaged groups.",
                    "Article 19 of the Indian Constitution guarantees the right to freedom of speech and expression, enabling individuals to freely voice their opinions, ideas, and beliefs. This right is essential for the functioning of democracy, allowing for open discourse, criticism, and the exchange of diverse perspectives. While this freedom is fundamental, it is subject to reasonable restrictions in the interest of national security, public order, and morality. This provision empowers citizens to participate actively in the democratic process and fosters an informed and engaged society.",
                    "Article 21A of the Indian Constitution affirms the right to free and compulsory education for all children between the ages of six and fourteen. This provision underscores the nation's commitment to nurturing the intellectual and personal growth of its younger citizens by ensuring access to quality education. By promoting literacy, critical thinking, and social awareness, the right to education is foundational to fostering equality, eradicating poverty, and empowering individuals to lead fulfilling lives and contribute meaningfully to society.",
                    "Article 24 of the Indian Constitution forbids the employment of children under fourteen years old in factories, mines, or any dangerous occupations. The purpose of this article is to shield young individuals from exploitation and harmful work conditions, thereby supporting their health, safety, and overall development. This provision reflects a dedication to protecting children’s rights and fostering their education and well-being.",
                    "Articles 25 to 28 of the Indian Constitution protect religious freedoms by ensuring that individuals can practice and propagate their religion, allow religious groups to manage their own institutions, and prohibit compulsory religious taxes. They also ensure that government-funded schools cannot impart religious instruction, although private institutions can do so if they choose. These provisions balance individual religious rights with public order and secular principles.",
                    "Article 32 of the Indian Constitution grants individuals the right to seek enforcement of their fundamental rights through the courts. This provision, often referred to as the 'heart and soul' of the Constitution, allows citizens to approach the Supreme Court or High Courts for protection against any violation of their fundamental rights. By providing access to judicial remedies, this article ensures that justice is upheld and that individuals are safeguarded from arbitrary or unlawful actions by the state or other entities."
                ]);
                break;
            case "duties":
                setLearnTopic("Fundamental Duties!")
                break;
            case "preamble":
                setLearnTopic("Preamble of the Constitution!");
                break;
            default:
                break;
        }
    }, [topic]); // Dependency array ensures effect runs only when `topic` changes

    const [ constitutions, setConstitutions ] = useState([])
    
    async function getConstitution(){
        try{
          const res = await fetch('/api/learn/:topic', {
            method : 'POST',
            headers : { 
              'Content-Type': 'application/json'
            },
            body : JSON.stringify({section : topic})
          })
          
          const data = await res.json()
    
          if(data.success === false){
            console.log(data.message)
            return
          }
          setConstitutions(data.constitutions);
    
        }
        catch(err){
          console.log(err)
        }
      }
    
      useEffect(()=>{
        getConstitution();
      }, [])
    
    
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
            <div className='learn-main-container'>
                <h1>Let's learn about {learnTopic}!</h1>
                {topic == "rights" && (<div className="circular-carousel">
                    <FancyCarousel 
                        images={images}
                        carouselRadius={200}
                        centralImageRadius={100}
                        peripheralImageRadius={50}
                        setFocusElement={setFocusElement}
                        autoRotateTime={4}
                        borderHexColor={'7f5104'}
                    />
                    <div className="info-box-wrapper">
                        <h1>{info[focusElement]}</h1> 
                        <p>{desc[focusElement]}</p>
                    </div>
                </div> )}
                {topic == "duties" && (
                <div className="slider-container">
                    <Slider {...settings}>
                        {[
                            'https://res.cloudinary.com/di1qhxfqv/image/upload/v1725548226/Duties/flezt6yuwobcyhrmfwij.png',
                            'https://res.cloudinary.com/di1qhxfqv/image/upload/v1725548226/Duties/jzyms4fz6ofaitjzhmyo.png',
                            'https://res.cloudinary.com/di1qhxfqv/image/upload/v1725548226/Duties/det4icxg7jb1fnamov2h.png',
                            'https://res.cloudinary.com/di1qhxfqv/image/upload/v1725548226/Duties/pkv1mu0x72gmmm5mtjsr.png',
                            'https://res.cloudinary.com/di1qhxfqv/image/upload/v1725548226/Duties/tbwaz4ovfu4ayyfciex8.png',
                            'https://res.cloudinary.com/di1qhxfqv/image/upload/v1725548226/Duties/dcxuwbiga1vd3smwtgi1.png',
                            'https://res.cloudinary.com/di1qhxfqv/image/upload/v1725548226/Duties/pvt0wat797qgg820pw5h.png',
                            'https://res.cloudinary.com/di1qhxfqv/image/upload/v1725548226/Duties/flaes2dxtlwkvstk352k.png',
                            'https://res.cloudinary.com/di1qhxfqv/image/upload/v1725548226/Duties/dnj1gjpgenzga0lljohs.png',
                            'https://res.cloudinary.com/di1qhxfqv/image/upload/v1725548226/Duties/hjxgbao9s7mbcnuxtqqa.png',
                            'https://res.cloudinary.com/di1qhxfqv/image/upload/v1725548226/Duties/ntttfw4viv8kl0lzq1qd.png',
                        ].map((imgUrl, index) => (
                            <div key={index} className="card-container-duties">
                                <img src={imgUrl} alt={`Duty ${index + 1}`} />
                            </div>
                        ))}
                    </Slider>
                </div>
            )}
                
            </div>
            <div className="map-container">
                <div className="info">
                    <h1>Explore the Interactive Real Life scenarios!</h1>
                    <p>Instructions: </p>
                    <ul>
                        <li>Click on the pointers shown on the Map of India!</li>
                        <li>Understand the Scenario and gain insights on variuos {learnTopic}</li>
                    </ul>
                </div>
                <IndiaMap data={constitutions}/>
            </div>
        </>
    );
}

export default Learn;
