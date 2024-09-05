import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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

async function updateProgress(){
  try{
    const res = await fetch('/api/learn/progress-update', {
      method : 'POST',
      headers : { 
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({section : topic, userId : currentUser? currentUser._id : null})
    })
    
    const data = await res.json()

    if(data.success === false){
      console.log(data.message)
      return
    }
  }
  catch(err){
    console.log(err)
  }
}

const IndiaMap = ({ data }) => {

  const currentUser = useSelector((state) => state.user.user)

  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  console.log("data in indiamap: ", data[0])
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

  return (
    <div>
      <MapContainer center={[22.5937, 81.9629]} zoom={5} maxZoom={7} minZoom={4} maxBounds={indiaBounds} maxBoundsViscosity={1.0} style={{ height: '700px', width: '800px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {Array.isArray(data) && data.map((marker, idx) => {
          console.log("Mrker: ", marker)
          if (marker.location && marker.location.lat && marker.location.lng) {
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
            <div className='modal'>
              <img src={selectedLocation.image} alt="" width={700} className='modal-img'/>
              <p className='scenario'>{selectedLocation.story}</p>
              <br />
              <p className='question'>{selectedLocation.question}</p>
              <div className="options">
                {selectedLocation.options.map((op, idx) => (
                    <button className='option' key={idx}>{op}</button>
                ))}
              </div>
              
            </div>
          )}
        </div>
        
      </Modal>
    </div>
  );
};

export default IndiaMap;