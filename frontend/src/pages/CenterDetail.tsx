import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaMapMarkerAlt, FaPhone, FaGlobe, FaBuilding } from 'react-icons/fa';
import { getPetsByCenterId } from '../api/pets';
import AnimalCard from '../components/cards/AnimalCard'; // Asegúrate de que esta ruta sea correcta

import markerIcon from 'leaflet/dist/images/marker-icon.png'; // Importando el icono de Leaflet

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface Pet {
  petId: number;
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: string;
  description: string;
  photoUrl: string | null;
  available: boolean;
  adoptionCenter: {
    centerId: number;
    name: string;
  };
}

const CenterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [center, setCenter] = useState<any | null>(null);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    // Obtener los detalles del centro desde localStorage
    const storedCenters = JSON.parse(localStorage.getItem('centers') || '[]');

    // Buscar el centro con el centerId correcto
    const storedCenter = storedCenters.find((center: any) => center.centerId === parseInt(id!, 10));

    if (storedCenter) {
      setCenter(storedCenter);

      // Solo asignar las coordenadas si están definidas y son válidas
      if (storedCenter.position && Array.isArray(storedCenter.position) && storedCenter.position.length === 2) {
        setCoordinates(storedCenter.position);
      }

      // Obtener todas las mascotas asociadas a este centro utilizando el centerId
      const fetchPets = async () => {
        try {
          const petsData = await getPetsByCenterId(storedCenter.centerId); // Usar el centerId para obtener todas las mascotas del centro
          setPets(petsData);
        } catch (error) {
          console.error('Error fetching pets:', error);
        }
      };

      fetchPets();
    }
  }, [id]);

  if (!center) {
    return <div className="text-center mt-10 text-2xl font-semibold text-gray-600">No se encontró el centro.</div>;
  }

  return (
    <div className="w-full p-6 bg-white shadow-lg rounded-lg m-4">
      {/* Título del centro */}
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">{center.name}</h1>

      {/* Imagen principal grande */}
      <div className="w-full mb-6">
        <img
          src={center.imageUrl}
          alt={center.name}
          className="w-full h-96 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Card para la información del centro y el mapa */}
      <div className="w-full bg-gradient-to-r from-blue-50 to-blue-100 shadow-md mb-6 p-6">
        <div className="flex flex-col lg:flex-row w-full">
          {/* Información del centro a la izquierda */}
          <div className="lg:w-1/2 p-4 flex flex-col">
            <p className="text-lg flex items-center mb-2">
              <FaMapMarkerAlt className="text-blue-600 mr-2" />
              <span className="font-semibold">Dirección: </span> {center.address}, {center.city.name}, {center.city.state.name}
            </p>
            <p className="text-lg flex items-center mb-2">
              <FaBuilding className="text-blue-600 mr-2" />
              <span className="font-semibold">Código Postal: </span> {center.postalCode}
            </p>
            <p className="text-lg flex items-center mb-2">
              <FaPhone className="text-blue-600 mr-2" />
              <span className="font-semibold">Teléfono: </span> {center.phone}
            </p>
            <p className="text-lg flex items-center mb-2">
              <FaGlobe className="text-blue-600 mr-2" />
              <span className="font-semibold">Website: </span>
              <a
                href={center.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline ml-1"
              >
                {center.website}
              </a>
            </p>
            <p className="text-lg">
              <span className="font-semibold">Año de Fundación:</span> {center.foundationYear}
            </p>
          </div>

          {/* Mapa a la derecha */}
          {coordinates ? (
            <div className="lg:w-1/2 p-4 lg:ps-6">
              <MapContainer center={coordinates} zoom={13} className="h-64 shadow-md">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={coordinates} icon={customIcon}>
                  <Popup>{center.name}</Popup>
                </Marker>
              </MapContainer>
            </div>
          ) : (
            <div className="lg:w-1/2 p-4 flex items-center justify-center">
              <p className="text-gray-500">Coordenadas no disponibles</p>
            </div>
          )}
        </div>
      </div>

      {/* Lista de mascotas */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Animales en el Refugio</h2>
        {pets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet: Pet) => (
              <AnimalCard key={pet.petId} pet={pet} />
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-500">No hay animales disponibles actualmente en este refugio.</p>
        )}
      </div>
    </div>
  );
};

export default CenterDetail;
