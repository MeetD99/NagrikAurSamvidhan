import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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

const IndiaMap = ({ locations, data }) => {
  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Function to handle marker click
  const onMarkerClick = (location) => {
    setSelectedLocation(location);
    setOpen(true);  // Open modal
  };

  // Function to close modal
  const onCloseModal = () => {
    setOpen(false);
    setSelectedLocation(null);
  };

  return (
    <div>
      <MapContainer center={[22.5937, 81.9629]} zoom={5} style={{ height: '700px', width: '800px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location, idx) => (
          <Marker
            key={idx}
            position={[location.lat, location.lng]}
            icon={customIcon}
            eventHandlers={{
              click: () => onMarkerClick(location), // Handle marker click
            }}
          />
        ))}
      </MapContainer>

      {/* Modal that opens when marker is clicked */}
      <Modal open={open} onClose={onCloseModal} center>
        {selectedLocation && (
          <div>
            <img src={data.imgUrl} alt="" width={500}/>
            <p>Scenario {data.scenario}</p>
            {data.options.map((op, idx) => (
                <p key={idx}>Option: {op}</p>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default IndiaMap;
