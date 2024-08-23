import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useFetchCenters } from '../../hooks/useFetchCenters';
import { useUserPosition } from '../../hooks/useUserPosition';
import SearchBar from './SearchRefugio';

// Define el tipo Coordinates
type Coordinates = [number, number];

// Componente para actualizar el centro del mapa
const ChangeMapView: React.FC<{ position: Coordinates | null }> = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 13); // Cambia el zoom según lo necesario
    }
  }, [position, map]);

  return null;
};

const Mapa: React.FC = () => {
  const [userPosition] = useUserPosition();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCenter, setSelectedCenter] = useState<Coordinates | null>(null);

  // Pasar searchQuery al hook useFetchCenters
  const { filteredCenters, loading } = useFetchCenters(searchQuery);

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

  useEffect(() => {
    if (filteredCenters.length > 0 && searchQuery) {
      setSelectedCenter(filteredCenters[0].position);
    }
  }, [filteredCenters, searchQuery]);

  return (
    <div className='w-full mt-5 justify-center items-center'>
      <SearchBar onSearch={setSearchQuery} />
      {loading ? (
        <div className='flex justify-center items-center' style={{ height: '400px' }}>
          <p>Cargando refugios...</p> {/* Mensaje de carga */}
        </div>
      ) : (
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
                </div>
              </Popup>
            </Marker>
          ))}
          <ChangeMapView position={selectedCenter} /> {/* Componente para cambiar la vista del mapa */}
        </MapContainer>
      )}
    </div>
  );
};

export default Mapa;
