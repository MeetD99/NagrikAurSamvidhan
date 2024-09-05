import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Modal } from 'react-responsive-modal';
import { useSelector } from 'react-redux';
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



async function checkAnswer(idx, conId) {
  try {
    const res = await fetch('/api/learn/scenario/check-ans', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ans: idx, conId: conId })
    });

    const data = await res.json();
    
    return data.isCorrect ? idx : data.correct; // Return correct index if wrong answer
  } catch (err) {
    console.log(err);
    return null;
  }
}

const IndiaMap = ({ data }) => {
  const currentUser = useSelector((state) => state.user.user);

  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null); // To store selected option index
  const [correctOption, setCorrectOption] = useState(null);   // To store correct option index
  const [resultMessage, setResultMessage] = useState('');     // To store result message (Correct/Incorrect)

  // Function to handle marker click
  const onMarkerClick = (marker) => {
    setSelectedLocation(marker);
    setOpen(true);  // Open modal
    setSelectedOption(null); // Reset selected option when new modal opens
    setCorrectOption(null);  // Reset correct option when new modal opens
    setResultMessage('');    // Reset result message when new modal opens
  };

  // Function to close modal
  const onCloseModal = () => {
    setOpen(false);
    setSelectedLocation(null);
  };

  async function updateProgress(topic) {
    try {
      const res = await fetch('/api/user/progress-update', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ section: topic, userId: currentUser?._id || null })
      });
  
      const data = await res.json();
  
      if (!data.success) {
        console.log(data.message);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }

  

  // Handle answer selection
  const handleAnswerSelection = async (idx, conId) => {
    const correctIdx = await checkAnswer(idx, conId); // Check if answer is correct or get correct answer
    setSelectedOption(idx); // Store selected option index
    setCorrectOption(correctIdx); // Store correct option index

    // Set the result message based on the correctness of the selected answer
    if (correctIdx === idx) {
      setResultMessage('Correct!');
    } else {
      setResultMessage('Incorrect!');
    }
  };

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
      </MapContainer>

      {/* Modal that opens when marker is clicked */}
      <Modal open={open} onClose={onCloseModal} center>
        <div className="modal-container">
          {selectedLocation && (
            <div className="modal">
              <img src={selectedLocation.image} alt="" width={700} className="modal-img" />
              <p className="scenario">{selectedLocation.story}</p>
              <br />
              <p className="question">{selectedLocation.question}</p>
              <div className="options">
                {selectedLocation.options.map((op, idx) => (
                  <button
                    className={`option 
                      ${selectedOption === idx && selectedOption === correctOption ? 'correct' : ''} 
                      ${selectedOption === idx && selectedOption !== correctOption ? 'incorrect' : ''}
                      ${correctOption === idx && selectedOption !== idx ? 'correct' : ''}`} // Apply different styles based on correctness
                    key={idx}
                    onClick={() => {
                      if (selectedOption === null) {
                        handleAnswerSelection(idx, selectedLocation._id);  // Check answer only if no option is selected yet
                      }
                    }}
                  >
                    {op}
                  </button>
                ))}
              </div>
              
              {selectedOption !== null && (
                <div>
                  <h3 className={`result-message ${resultMessage.toLowerCase()}`}>
                    {resultMessage}
                  </h3>
                  <p>{selectedLocation.description}</p>
                  {console.log(selectedLocation.section,currentUser._id)}
                  {selectedOption === correctOption? <button onClick={()=>{updateProgress(selectedLocation.section); onCloseModal();}}>Got it!</button> : null}
                </div>
              )}
              
            </div>

          )}
        </div>
      </Modal>
    </div>
  );
};

export default IndiaMap;
