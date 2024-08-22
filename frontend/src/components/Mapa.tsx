import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import centersData from '../JSON/adoption_centers.json';

type Coordinates = [number, number];

interface Center {
  center_id: number;
  user_id: number;
  name: string;
  address: string;
  postal_code: string;
  phone: string;
  website: string;
  foundation_year: number;
  photoURL: string;
}

const Mapa: React.FC = () => {
  const [userPosition, setUserPosition] = useState<Coordinates | null>(null);
  const [centers, setCenters] = useState<{ name: string; position: Coordinates; phone: string; website: string; photoURL: string }[]>([]);

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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude] as Coordinates);
        },
        (error) => {
          console.error('Error buscando la ubicación', error);
        }
      );
    }
  }, []);

  useEffect(() => {
    const fetchCenterCoordinates = async () => {
      const geocodeUrl = 'https://nominatim.openstreetmap.org/search?format=json&q=';

      const centerPromises = centersData.map(async (center: Center) => {
        try {
          const response = await fetch(`${geocodeUrl}${encodeURIComponent(center.address)}`);
          const data = await response.json();
          const location = data[0];
          if (location) {
            return {
              name: center.name,
              position: [parseFloat(location.lat), parseFloat(location.lon)] as Coordinates,
              phone: center.phone,
              website: center.website,
              photoURL: center.photoURL,
            };
          }
          return null;
        } catch (error) {
          console.error('Error fetching geocode data', error);
          return null;
        }
      });

      const centersWithCoordinates = (await Promise.all(centerPromises)).filter((center) => center !== null) as { name: string; position: Coordinates; phone: string; website: string; photoURL: string }[];
      setCenters(centersWithCoordinates);
    };

    fetchCenterCoordinates();
  }, []);

  return (
    <div className='w-full mt-5 justify-center items-center'>
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
        {centers.map((center, index) => (
          <Marker key={index} position={center.position} icon={centerIcon}>
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
      </MapContainer>
    </div>
  );
};

export default Mapa;
