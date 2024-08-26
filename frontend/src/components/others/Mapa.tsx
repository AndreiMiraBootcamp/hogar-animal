import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Center } from '../../interfaces/Center';
import SearchBar from './SearchBarCenters';
import { FaCrosshairs } from 'react-icons/fa'; // Importa un ícono para el botón

interface MapaProps {
  centers: Center[];
  searchQuery: string;
  onSearch: (query: string) => void;
}

const ChangeMapView: React.FC<{ position: [number, number] | null }> = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 13);
    } else {
      map.setView([40.1168, -2.7038], 6);
    }
  }, [position, map]);

  return null;
};

const Mapa: React.FC<MapaProps> = ({ centers, searchQuery, onSearch }) => {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [selectedCenter, setSelectedCenter] = useState<[number, number] | null>(null);

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

  const filteredCenters = centers.filter((center) =>
    center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    center.city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    center.address.toLowerCase().includes(searchQuery.toLowerCase()) // Agregar filtrado por dirección
  );

  useEffect(() => {
    if (searchQuery === '') {
      // Si la barra de búsqueda está vacía, restaurar el zoom y la posición iniciales
      setSelectedCenter(null); // Esto hará que el mapa vuelva a su vista inicial
    } else if (filteredCenters.length > 0 && searchQuery) {
      const position = filteredCenters[0]?.position;
      if (position) {
        setSelectedCenter(position);
      }
    }
  }, [filteredCenters, searchQuery]);

  // Función para obtener la ubicación actual del usuario
  const handleLocateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
          setSelectedCenter([latitude, longitude]); // Asegurarse de que la vista se centre en la ubicación
        },
        async (error) => {
          console.error("Error al obtener la ubicación del usuario:", error);
          // Intentar obtener la ubicación a partir de localStorage si la geolocalización falla
          const userData = JSON.parse(localStorage.getItem('userData') || '{}');
          if (userData && userData.address && userData.city && userData.postalCode) {
            const fullAddress = `${userData.address}, ${userData.city.name}, ${userData.postalCode}`;
            const coordinates = await getCoordinatesFromAddress(fullAddress);
            if (coordinates) {
              setUserPosition(coordinates);
              setSelectedCenter(coordinates); // Asegurarse de aplicar el zoom correctamente
            }
          } else {
            alert("No se pudo obtener la ubicación actual ni la ubicación guardada.");
          }
        },
        {
          timeout: 10000, // Puedes ajustar el tiempo de espera
          maximumAge: 0,
        }
      );
    } else {
      alert("Geolocalización no soportada en este navegador.");
    }
  };

  // Función para convertir una dirección en coordenadas
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

  return (
    <div className="relative w-full mt-5 justify-center items-center">
      <MapContainer
        center={userPosition || [40.1168, -2.7038]} // Madrid como centro si no hay ubicación del usuario
        zoom={userPosition ? 13 : 6} // Ajuste de zoom
        style={{ height: '500px', width: '100%', borderRadius: '20px', overflow: 'hidden' }}
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
                  }
                },
              }}
            >
              <Popup>
                <div style={{ width: '200px' }}>
                  <img src={center.imageUrl} alt={center.name} style={{ width: '100%', height: 'auto' }} />
                  <h3>{center.name}</h3>
                </div>
              </Popup>
            </Marker>
          );
        })}
        <ChangeMapView position={selectedCenter} />
      </MapContainer>

      <div className="absolute top-5 right-2" style={{ zIndex: 1000 }}>
        <SearchBar onSearch={onSearch} />
      </div>

      {/* Botón para centrar la ubicación del usuario */}
      <button
        onClick={handleLocateUser}
        className="absolute bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg"
        style={{ zIndex: 1000 }}
      >
        <FaCrosshairs size={20} /> {/* Ícono para representar la acción de centrar */}
      </button>
    </div>
  );
};

export default Mapa;
