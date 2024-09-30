// import React, { useState } from 'react';
// import 'leaflet/dist/leaflet.css';
// import { MapContainer, TileLayer, Marker } from 'react-leaflet';
// import { Icon } from 'leaflet';
// import { Modal } from 'react-responsive-modal';
// import { useSelector } from 'react-redux';
// import 'react-responsive-modal/styles.css'; // import modal styles
// import Location from '../assets/location.png';

// // Custom icon for the markers
// const customIcon = new Icon({
//   iconUrl: Location,
//   iconSize: [35, 35], // size of the icon
//   iconAnchor: [17, 35],  // center bottom of the icon
//   popupAnchor: [0, -35], // point from which the popup should open relative to the iconAnchor
// });

// const indiaBounds = [
//   [6.5546079, 68.1113787], // Southwest corner (minLat, minLng)
//   [35.6745457, 97.395561], // Northeast corner (maxLat, maxLng)
// ];



// async function checkAnswer(idx, conId) {
//   try {
//     const res = await fetch('https://nagrik-aur-samvidhan-backend.vercel.app/api/learn/scenario/check-ans', {
//       method: 'POST',
//       headers: { 
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ ans: idx, conId: conId })
//     });

//     const data = await res.json();
    
//     return data.isCorrect ? idx : data.correct; // Return correct index if wrong answer
//   } catch (err) {
//     console.log(err);
//     return null;
//   }
// }

// const IndiaMap = ({ data }) => {
//   const currentUser = useSelector((state) => state.user.user);

//   const [open, setOpen] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [selectedOption, setSelectedOption] = useState(null); // To store selected option index
//   const [correctOption, setCorrectOption] = useState(null);   // To store correct option index
//   const [resultMessage, setResultMessage] = useState('');     // To store result message (Correct/Incorrect)

//   // Function to handle marker click
//   const onMarkerClick = (marker) => {
//     setSelectedLocation(marker);
//     setOpen(true);  // Open modal
//     setSelectedOption(null); // Reset selected option when new modal opens
//     setCorrectOption(null);  // Reset correct option when new modal opens
//     setResultMessage('');    // Reset result message when new modal opens
//   };

//   // Function to close modal
//   const onCloseModal = () => {
//     setOpen(false);
//     setSelectedLocation(null);
//   };

//   const caseStudies = [
//     {
//       id: 1,
//       title: "Case Study 1: Right to Equality",
//       content: "In this case, the Supreme Court deliberated on the right to equality, addressing discrimination faced by individuals based on caste. The court ruled that such discrimination is unconstitutional and goes against Article 14, ensuring equality before the law.",
//       location: { lat: 28.6139, lng: 77.209 },
//     },
//     {
//       id: 2,
//       title: "Case Study 2: Freedom of Speech",
//       content: "This case study focuses on the restrictions imposed on freedom of speech during times of emergency. The court emphasized that freedom of speech is a fundamental right, protected under Article 19, and can only be curtailed under specific circumstances laid out in the Constitution.",
//       location: { lat: 12.9716, lng: 77.5946 },
//     }
//   ];

//   async function updateProgress(topic) {
//     try {
//       const res = await fetch('https://nagrik-aur-samvidhan-backend.vercel.app/api/user/progress-update', {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ section: topic, userId: currentUser?._id || null })
//       });
  
//       const data = await res.json();
  
//       if (!data.success) {
//         console.log(data.message);
//         return;
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }

  

//   // Handle answer selection
//   const handleAnswerSelection = async (idx, conId) => {
//     const correctIdx = await checkAnswer(idx, conId); // Check if answer is correct or get correct answer
//     setSelectedOption(idx); // Store selected option index
//     setCorrectOption(correctIdx); // Store correct option index

//     // Set the result message based on the correctness of the selected answer
//     if (correctIdx === idx) {
//       setResultMessage('Correct!');
//     } else {
//       setResultMessage('Incorrect!');
//     }
//   };

//   return (
//     <div>
//       <MapContainer center={[22.5937, 81.9629]} zoom={5} maxZoom={7} minZoom={4} maxBounds={indiaBounds} maxBoundsViscosity={1.0} style={{ height: '700px', width: '800px' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         {Array.isArray(data) && data.map((marker, idx) => {
//           if (marker.location?.lat && marker.location?.lng) {
//             return (
//               <Marker
//                 key={idx}
//                 position={[marker.location.lat.$numberDecimal, marker.location.lng.$numberDecimal]}
//                 icon={customIcon}
//                 eventHandlers={{
//                   click: () => onMarkerClick(marker), // Handle marker click
//                 }}
//               />
//             );
//           } else {
//             console.warn('Invalid marker data:', marker);
//             return null; // Skip invalid marker
//           }
//         })}

        
//       </MapContainer>

//       {/* Modal that opens when marker is clicked */}
//       <Modal open={open} onClose={onCloseModal} center>
//         <div className="modal-container">
//           {selectedLocation && (
//             <div className="modal">
//               <img src={selectedLocation.image} alt="" width={700} className="modal-img" />
//               <p className="scenario">{selectedLocation.story}</p>
//               <br />
//               <p className="question">{selectedLocation.question}</p>
//               <div className="options">
//                 {selectedLocation.options.map((op, idx) => (
//                   <button
//                     className={`option 
//                       ${selectedOption === idx && selectedOption === correctOption ? 'correct' : ''} 
//                       ${selectedOption === idx && selectedOption !== correctOption ? 'incorrect' : ''}
//                       ${correctOption === idx && selectedOption !== idx ? 'correct' : ''}`} // Apply different styles based on correctness
//                     key={idx}
//                     onClick={() => {
//                       if (selectedOption === null) {
//                         handleAnswerSelection(idx, selectedLocation._id);  // Check answer only if no option is selected yet
//                       }
//                     }}
//                   >
//                     {op}
//                   </button>
//                 ))}
//               </div>
              
//               {selectedOption !== null && (
//                 <div className='result-container'>
//                   <h3 className={`result-message ${resultMessage.toLowerCase()}`}>
//                     {resultMessage}
//                   </h3>
//                   <p>{selectedLocation.description}</p>
//                   {console.log(selectedLocation.section,currentUser._id)}
//                   {selectedOption === correctOption? <button onClick={()=>{updateProgress(selectedLocation.section); onCloseModal();}}>Got it!</button> : null}
//                 </div>
//               )}
              
//             </div>

//           )}
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default IndiaMap;

import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css'; // import modal styles
import Location from '../assets/location.png';

// Custom icon for the markers
const customIcon = new Icon({
  iconUrl: Location,
  iconSize: [35, 35], // size of the icon
  iconAnchor: [17, 35],  // center bottom of the icon
  popupAnchor: [0, -35], // point from which the popup should open relative to the iconAnchor
});

const indiaBounds = [
  [6.5546079, 68.1113787], // Southwest corner (minLat, minLng)
  [35.6745457, 97.395561], // Northeast corner (maxLat, maxLng)
];

const IndiaMap = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Function to handle marker click
  const onMarkerClick = (marker) => {
    setSelectedLocation(marker);
    setOpen(true);  // Open modal
  };

  // Function to close modal
  const onCloseModal = () => {
    setOpen(false);
    setSelectedLocation(null);
  };

  // Hardcoded case studies
  const caseStudies = [
    {
      id: 1,
      title: "Indira Gandhi v. Raj Narain",
      time: "1975",
      facts: 
        `The case arose out of the 1971 general elections, in which Indira Gandhi was re-elected as the Prime Minister of India from the Rae Bareli constituency. Raj Narain, her rival and a prominent socialist leader, filed a petition in the Allahabad High Court accusing her of corrupt electoral practices.
        
        Raj Narain alleged that Indira Gandhi used government machinery and officials, including the police and civil servants, to support her election campaign. He argued that Gandhi had violated the Representation of the People Act, 1951, by exceeding the legal limits on election expenditures and using government vehicles to transport voters to polling stations.
        
        The trial took several years, but in 1975, Justice Jagmohanlal Sinha of the Allahabad High Court found Gandhi guilty of electoral malpractices. The court nullified her election and barred her from holding public office for six years. This unprecedented ruling sent shockwaves across India and the world, as it was the first time a sitting Prime Minister was disqualified from office.`,
      impact: 
        `The immediate impact of the judgment was monumental. On June 25, 1975, Indira Gandhi, in consultation with her advisors, declared a state of Emergency across India, citing internal disturbances and threats to national security. Under the Emergency, civil liberties were suspended, political opponents were imprisoned, and the press was heavily censored.
        
        The judgment not only changed the course of Indian democracy but also exposed weaknesses in the electoral system and the laws governing elections. In response to the crisis, Gandhi's government passed the 39th Constitutional Amendment, which retroactively absolved her from all charges of electoral malpractices and made it impossible to challenge the election of a sitting Prime Minister in court.
        
        The period of the Emergency (1975-1977) is remembered as one of the darkest chapters in Indian democracy, where fundamental rights were curtailed, and the power of the executive grew unchecked. However, it also led to a greater awareness of the importance of protecting civil liberties and limiting the powers of the state.`,
      judgment: 
        `While the Supreme Court initially stayed the High Court's ruling, Indira Gandhi’s election was eventually annulled. The 42nd Amendment, which attempted to curb judicial review, was passed during the Emergency but was rolled back after Gandhi's government was defeated in the 1977 elections.
        
        The case set a vital precedent regarding the separation of powers and judicial review in India. It reaffirmed that no individual, not even the Prime Minister, is above the law. In the years following the Emergency, electoral reforms were introduced, and the judiciary's role in upholding constitutional principles was strengthened.`,
      location: { lat: 28.6139, lng: 77.209 }, // New Delhi
    },
    {
      id: 2,
      title: "Mohammed Ajmal Amir Kasab v. State of Maharashtra",
      time: "2008 - 2012",
      facts: 
        `On the night of November 26, 2008, a group of 10 heavily armed terrorists launched a series of coordinated attacks across Mumbai, targeting iconic locations such as the Taj Mahal Palace Hotel, Oberoi Trident Hotel, CST Railway Station, and Nariman House. The attacks lasted for over 60 hours, resulting in the deaths of over 160 people, including foreigners, police officers, and civilians. The attackers were members of the Pakistan-based militant group Lashkar-e-Taiba.
        
        Ajmal Kasab, one of the attackers, was the only one captured alive by Indian security forces. Kasab was found guilty of 80 criminal charges, including murder, waging war against India, and terrorism. His trial, which began in early 2009, was seen as a critical test of India’s ability to deliver justice in the face of terror.`,
      impact: 
        `The Mumbai attacks had a profound impact on India's national security apparatus and its approach to counterterrorism. In the immediate aftermath of the attacks, the Indian government introduced several reforms, including the establishment of the National Investigation Agency (NIA) to handle cases of terrorism and the modernization of police forces across the country.
        
        Kasab’s case was significant because it showcased India's commitment to the rule of law, even in cases involving terrorism. Despite the public outrage and demand for swift justice, the Indian judiciary ensured that Kasab was given a fair trial, with a defense attorney and the right to appeal.
        
        The case also had international ramifications, as it exposed the involvement of Pakistan-based terror networks. Relations between India and Pakistan deteriorated, and diplomatic efforts were made to pressure Pakistan to take action against terror groups operating on its soil.`,
      judgment: 
        `In 2010, the trial court sentenced Kasab to death, a decision that was later upheld by both the Bombay High Court and the Supreme Court of India. Kasab's appeals for clemency were rejected by the President of India in 2012.
        
        On November 21, 2012, Ajmal Kasab was executed by hanging in Pune’s Yerwada Central Jail, marking the conclusion of one of India’s most high-profile terrorism cases. The execution was carried out in secrecy, and the news was made public only after the fact to avoid any security risks.
        
        The judgment and execution sent a strong message about India’s zero-tolerance policy towards terrorism and reinforced the legal process that even individuals involved in acts of terror would receive a fair trial before the law.`,
      location: { lat: 12.9716, lng: 77.5946 }, // Bangalore (symbolic for the southern region as the trial was in Mumbai, but relevant here)
    }
  ];
  
  return (
    <div>
      <MapContainer center={[22.5937, 81.9629]} zoom={5} maxZoom={7} minZoom={4} maxBounds={indiaBounds} maxBoundsViscosity={1.0} style={{ height: '700px', width: '800px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {Array.isArray(data) && data.map((marker, idx) => {
          if (marker.location?.lat && marker.location?.lng) {
            return (
              <Marker
                key={idx}
                position={[marker.location.lat.$numberDecimal, marker.location.lng.$numberDecimal]}
                icon={customIcon}
                eventHandlers={{
                  click: () => onMarkerClick(marker), // Handle marker click
                }}
              />
            );
          } else {
            console.warn('Invalid marker data:', marker);
            return null; // Skip invalid marker
          }
        })}

        {caseStudies.map((caseStudy, idx) => (
          <Marker
            key={`caseStudy-${idx}`}
            position={[caseStudy.location.lat, caseStudy.location.lng]}
            icon={customIcon}
            eventHandlers={{
              click: () => onMarkerClick(caseStudy), // Handle marker click for case study
            }}
          />
        ))}
      </MapContainer>

      {/* Modal that opens when a marker is clicked */}
      <Modal open={open} onClose={onCloseModal} center>
        <div className="modal-container">
          {selectedLocation && (
            <div className="case-modal">
              <h2>{selectedLocation.title}</h2>
              <h3>{selectedLocation.time}</h3>
              <h2>Facts:</h2>
              <p>{selectedLocation.facts}</p>
              <h2>Impact:</h2>
              <p>{selectedLocation.impact}</p>
              <h2>Judgement:</h2>
              <p>{selectedLocation.judgment}</p>
              <p style={{ whiteSpace: 'pre-wrap' }}>{selectedLocation.content}</p>
              <button onClick={onCloseModal}>Close</button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default IndiaMap;

