import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { Center } from '../../interfaces/Center';
import SearchBar from './SearchBarCenters';
import { FaCrosshairs } from 'react-icons/fa';
import ErrorAlert from '../../error/ErrorAlert';

interface MapaProps {
  centers: Center[];
  searchQuery: string;
  onSearch: (query: string) => void;
}

const HandleBounds: React.FC<{ centers: Center[], userPosition: [number, number] | null, searchQuery: string }> = ({ centers, userPosition, searchQuery }) => {
  const map = useMap();

  useEffect(() => {
    if (searchQuery && centers.length > 0) {
      const bounds = L.latLngBounds(centers.map(center => [center.latitude!, center.longitude!] as L.LatLngTuple));
      map.fitBounds(bounds, { padding: [50, 50] });

      // Hacer un poco menos de zoom después de ajustar los límites
      const zoomLevel = map.getZoom() - 0.5; // Disminuir el zoom en 0.5 nivel
      map.setZoom(zoomLevel);
    } else if (userPosition) {
      map.setView(userPosition, 13);
    } else if (centers.length > 0) {
      const bounds = L.latLngBounds(centers.map(center => [center.latitude!, center.longitude!] as L.LatLngTuple));
      map.fitBounds(bounds, { padding: [50, 50] });

      // Hacer un poco menos de zoom después de ajustar los límites
      const zoomLevel = map.getZoom() - 0.5; // Disminuir el zoom en 0.5 nivel
      map.setZoom(zoomLevel);
    }
  }, [centers, userPosition, map, searchQuery]);

  return null;
};

const Mapa: React.FC<MapaProps> = ({ centers, searchQuery, onSearch }) => {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [userIcon, setUserIcon] = useState<L.Icon | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData && userData.image) {
      const imageUrl = `data:image/jpeg;base64,${userData.image}`;
      const userIcon = L.divIcon({
        className: 'user-icon',
        html: `<div class="user-icon-image" style="background-image: url('${imageUrl}');"></div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });
      setUserIcon(userIcon);
    } else {
      const defaultIcon = new L.Icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconSize: [30, 46],
        iconAnchor: [15, 46],
        popupAnchor: [0, -46],
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        shadowSize: [41, 41],
        shadowAnchor: [13, 41],
      });
      setUserIcon(defaultIcon);
    }
  }, []);

  const centerIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const filteredCenters = centers.filter((center) =>
    center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    center.city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    center.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLocateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Error al obtener la ubicación del usuario:", error);
        },
        {
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setError("Geolocalización no soportada en este navegador.");
    }
  };

  const resetZoom = () => {
    setUserPosition(null); // Resetea la posición del usuario
  };

  return (
    <div className="relative w-full mt-5 justify-center items-center">
      <MapContainer
        center={userPosition || [40.1168, -2.7038]}
        zoom={6}
        style={{ height: '500px', width: '100%', borderRadius: '20px', overflow: 'hidden' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <HandleBounds centers={filteredCenters} userPosition={userPosition} searchQuery={searchQuery} />
        {userPosition && userIcon && (
          <Marker position={userPosition} icon={userIcon}>
            <Popup>
              <p>Tu ubicación actual</p>
            </Popup>
          </Marker>
        )}
        {filteredCenters.map((center, index) => {
          if (!center.latitude || !center.longitude) return null;

          return (
            <Marker
              key={index}
              position={[center.latitude, center.longitude]}
              icon={centerIcon}
            >
              <Popup>
                <div style={{ width: '200px' }}>
                  <img src={center.imageUrl} alt={center.name} style={{ width: '100%', height: 'auto' }} />
                  <h3>{center.name}</h3>
                  <Link to={`/center/${center.centerId}`} className="text-blue-500 hover:underline">Ver detalles</Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <div className="absolute top-5 right-2" style={{ zIndex: 1000 }}>
        <SearchBar onSearch={onSearch} onResetZoom={resetZoom} />
      </div>

      <button
        onClick={handleLocateUser}
        className="absolute bottom-5 right-5 text-white p-3 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
        style={{ zIndex: 1000 }}
      >
        <FaCrosshairs size={20} />
      </button>
    </div>
  );
};

export default Mapa;
