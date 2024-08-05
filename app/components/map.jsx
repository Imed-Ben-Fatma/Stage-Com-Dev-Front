'use client'

import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet'; 


const customIcon = L.icon({
  iconUrl: '/images/localisation.png',
  iconSize: [50, 50],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});



export function ChangeView({ coords }) {
  const map = useMap();
  map.setView(coords, 12);
  return null;
}

export default function Map({coordonnees}) {
  const [latitude, longitude] = coordonnees.split(',').map(coord => coord.trim());

  const [geoData, setGeoData] = useState({ lat: latitude, lng: longitude });

  const center = [geoData.lat, geoData.lng];

  return (
    
    <MapContainer center={center} zoom={15} style={{ height: '60vh',width:'100' } } >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geoData.lat && geoData.lng && (
        <Marker position={[geoData.lat, geoData.lng]} icon={customIcon}/>
      )}
      <ChangeView coords={center} />
    </MapContainer>
    
  );
}
