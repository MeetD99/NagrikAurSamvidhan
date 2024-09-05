import React from 'react'
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import Location from '../assets/location.png';
const locations = [
    { lat: 28.6139, lng: 77.2090, name: "Delhi" },
    { lat: 19.0760, lng: 72.8777, name: "Mumbai" },
    { lat: 13.0827, lng: 80.2707, name: "Chennai" },
    { lat: 22.5726, lng: 88.3639, name: "Kolkata" },
    { lat: 12.9716, lng: 77.5946, name: "Bangalore" },
  ];
  
  // Custom icon for the markers
const customIcon = new Icon({
    iconUrl: Location,
    iconSize: [35, 35], // size of the icon
    iconAnchor: [17, 35],  // center bottom of the icon
    popupAnchor: [0, -35] // point from which the popup should open relative to the iconAnchor
  });

  const indiaBounds = [
    [6.5546079, 68.1113787], // Southwest corner (minLat, minLng)
    [35.6745457, 97.395561], // Northeast corner (maxLat, maxLng)
  ];


const IndiaMap = () => {
  return (
    <MapContainer center={[22.5937, 81.9629]} zoom={5} style={{ height: '700px', width: '800px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location, idx) => (
        <div key={idx}><Marker position={[location.lat, location.lng]} icon={customIcon} /></div>
        
      ))}
    </MapContainer>
  )
}

export default IndiaMap