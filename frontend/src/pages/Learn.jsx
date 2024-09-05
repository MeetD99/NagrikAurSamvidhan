import {React} from 'react'
import { useParams } from 'react-router-dom'
import IndiaMap from '../components/IndiaMap';

const Learn = () => {
    const { topic } = useParams(); // 'topic' will be the dynamic part of the URL
    const data = {
        scenario: "Anjali works at a company where she and her male colleague Ravi are both up for promotion. Even though Anjali works harder and has more experience,Ravi gets a higher salary just because he is a man. Anjali feels this is unfair. what should Anjali do?",
        options: ["Take Legal Action Under the Equal Remuneration Act, 1976", "Go back to Spawn, Kitchen!", "Cry", "Do Nothing"],
        correct_option: 0,
        imgUrl: "https://media.discordapp.net/attachments/1280938373816647686/1281177376860016650/image0.jpg?ex=66dac4e9&is=66d97369&hm=eb3fd1b4b74740657b218ffb6ea6473512e8099d8b12f6e885d972e65f10a0ab&=&format=webp&width=437&height=437"
    };

    const locations = [
        { lat: 28.6139, lng: 77.2090, name: "Delhi" },
        { lat: 19.0760, lng: 72.8777, name: "Mumbai" },
        { lat: 13.0827, lng: 80.2707, name: "Chennai" },
        { lat: 22.5726, lng: 88.3639, name: "Kolkata" },
        { lat: 12.9716, lng: 77.5946, name: "Bangalore" },
    ];

    return (
        <>
            <div className='learn-main-container'>
                <h1>Learn about {topic} according to the Indian Constitution!</h1>
            </div>
            <div className="map-container">
                <IndiaMap locations={locations} data={data}/>
            </div>
            
        </>
        
    );
}

export default Learn