import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { Center } from '../../interfaces/Center';
import SearchBar from './SearchBarCenters';
import { FaCrosshairs } from 'react-icons/fa';

interface MapaProps {
  centers: Center[];
  searchQuery: string;
  onSearch: (query: string) => void;
}

const HandleUserLocation: React.FC<{ position: [number, number] | null; zoom: number }> = ({ position, zoom }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, zoom);
    }
  }, [position, zoom, map]);

  return null;
};

const Mapa: React.FC<MapaProps> = ({ centers, searchQuery, onSearch }) => {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [selectedCenter, setSelectedCenter] = useState<[number, number] | null>(null);
  const [zoomLevel, setZoomLevel] = useState(6);
  const [userIcon, setUserIcon] = useState<L.Icon | null>(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData && userData.image) {
      const imageUrl = `data:image/jpeg;base64,${userData.image}`;
      const userIcon = L.divIcon({
        className: 'user-icon',
        html: `<div class="user-icon-image" style="background-image: url('${imageUrl}');"></div>`,
        iconSize: [40, 40], // Tamaño del icono
        iconAnchor: [20, 40], // Punto de anclaje
        popupAnchor: [0, -40], // Anclaje del popup
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

  useEffect(() => {
    if (searchQuery.trim() === '') {
    } else if (filteredCenters.length > 0) {
      const position = filteredCenters[0]?.position;
      if (position) {
        setSelectedCenter(position);
        setZoomLevel(13);
      }
    }
  }, [filteredCenters, searchQuery]);

  const handleLocateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
          setSelectedCenter([latitude, longitude]);
          setZoomLevel(13);
        },
        async (error) => {
          console.error("Error al obtener la ubicación del usuario:", error);
          const userData = JSON.parse(localStorage.getItem('userData') || '{}');
          if (userData && userData.address && userData.city && userData.postalCode) {
            const fullAddress = `${userData.address}, ${userData.city.name}, ${userData.postalCode}`;
            const coordinates = await getCoordinatesFromAddress(fullAddress);
            if (coordinates) {
              setUserPosition(coordinates);
              setSelectedCenter(coordinates);
              setZoomLevel(13);
            }
          } else {
            alert("No se pudo obtener la ubicación actual ni la ubicación guardada.");
          }
        },
        {
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      alert("Geolocalización no soportada en este navegador.");
    }
  };

  const getCoordinatesFromAddress = async (fullAddress: string): Promise<[number, number] | null> => {
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`;

    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();

      if (data && data.length > 0) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      }
    } catch (error) {
      console.error('Error al obtener coordenadas:', error);
    }

    return null;
  };

  const resetZoom = () => {
    setZoomLevel(6);
    setSelectedCenter([40.1168, -2.7038]);
  };

  return (
    <div className="relative w-full mt-5 justify-center items-center">
      <MapContainer
        center={userPosition || [40.1168, -2.7038]}
        zoom={zoomLevel}
        style={{ height: '500px', width: '100%', borderRadius: '20px', overflow: 'hidden' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <HandleUserLocation position={selectedCenter} zoom={zoomLevel} />
        {userPosition && userIcon && (
          <Marker position={userPosition} icon={userIcon}>
            <Popup>
              <p>Tu ubicación actual</p>
            </Popup>
          </Marker>
        )}
        {filteredCenters.map((center, index) => {
          if (!center.position) return null;

          return (
            <Marker
              key={index}
              position={center.position}
              icon={centerIcon}
              eventHandlers={{
                click: () => {
                  if (center.position) {
                    setSelectedCenter(center.position);
                    setZoomLevel(13);
                  }
                },
              }}
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
