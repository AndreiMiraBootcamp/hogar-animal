import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useFetchCenters } from '../../hooks/useFetchCenters';
import { useUserPosition } from '../../hooks/useUserPosition';
import SearchBar from './SearchRefugio';
import CenterMapOnSelectedCenter from './CenterMapOnSelectedCenter';

const Mapa: React.FC = () => {
  const [userPosition, setUserPosition] = useUserPosition();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCenter, setSelectedCenter] = useState<Coordinates | null>(null);

  const { centers, filteredCenters, setFilteredCenters } = useFetchCenters();

  useEffect(() => {
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = centers.filter(center =>
        center.name.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredCenters(filtered);

      if (filtered.length > 0) {
        setSelectedCenter(filtered[0].position);
      } else {
        setSelectedCenter(null);
      }
    } else {
      setFilteredCenters(centers);
      setSelectedCenter(null);
    }
  }, [searchQuery, centers, setFilteredCenters]);

  const userIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconSize: [30, 46],
    iconAnchor: [15, 46],
    popupAnchor: [0, -46],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
    shadowAnchor: [13, 41],
  });

  const centerIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <div className='w-full mt-5 justify-center items-center'>
      <SearchBar onSearch={setSearchQuery} />
      <MapContainer
        center={userPosition || [40.4168, -3.7038]} // Madrid como centro si no hay ubicación del usuario
        zoom={userPosition ? 13 : 6} // Ajuste de zoom
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        {userPosition && (
          <Marker position={userPosition} icon={userIcon}>
            <Popup>
              <p>Tu ubicación actual</p>
            </Popup>
          </Marker>
        )}
        {filteredCenters.map((center, index) => (
          <Marker
            key={index}
            position={center.position}
            icon={centerIcon}
            eventHandlers={{
              click: () => {
                setSelectedCenter(center.position);
              },
            }}
          >
            <Popup>
              <div style={{ width: '200px' }}>
                <img src={center.photoURL} alt={center.name} style={{ width: '100%', height: 'auto' }} />
                <h3>{center.name}</h3>
                <p><strong>Teléfono:</strong> {center.phone}</p>
                <p><strong>Website:</strong> <a href={center.website} target="_blank" rel="noopener noreferrer">{center.website}</a></p>
              </div>
            </Popup>
          </Marker>
        ))}
        <CenterMapOnSelectedCenter position={selectedCenter} />
      </MapContainer>
    </div>
  );
};

export default Mapa;
