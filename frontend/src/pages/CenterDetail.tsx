import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AnimalList from '../components/container/AnimalList';
import { Center } from '../interfaces/Center';
import { FaMapMarkerAlt, FaPhone, FaGlobe, FaBuilding } from 'react-icons/fa';

const CenterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [center, setCenter] = useState<Center | null>(null);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCenterData = async () => {
      try {
        // Obtener los datos del centro
        const centerResponse = await fetch(`http://localhost:8080/api/adoption-centers/${id}`);
        if (!centerResponse.ok) {
          throw new Error('Error al obtener los datos del centro');
        }
        const centerData: Center = await centerResponse.json();
        setCenter(centerData);

        // Obtener los datos de los animales en el centro
        const animalsResponse = await fetch(`http://localhost:8080/api/pets/center/${id}`);
        if (!animalsResponse.ok) {
          throw new Error('Error al obtener los datos de los animales');
        }
        const animalsData: Animal[] = await animalsResponse.json();
        setAnimals(animalsData);
      } catch (error) {
        setError('No se pudieron cargar los datos desde la API');
      } finally {
        setLoading(false);
      }
    };

    fetchCenterData();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10 text-2xl font-semibold text-gray-600">Cargando datos...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-2xl font-semibold text-red-500">{error}</div>;
  }

  if (!center) {
    return <div className="text-center mt-10 text-2xl font-semibold text-gray-600">No se encontró el centro.</div>;
  }

  return (
    <div className="w-full p-6 bg-gradient-to-r from-green-50 to-blue-50 shadow-lg rounded-lg m-4">
      <div className="flex flex-col lg:flex-row w-full">
        <div className="lg:w-1/3 mb-6 lg:mb-0">
          <img
            src={`http://localhost:5173/${center.photoUrl}/image_1.jpg`}
            alt={center.name}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="lg:w-2/3 ps-8 p-4 flex flex-col bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-green-800 mb-4">{center.name}</h1>
          <p className="text-lg flex items-center mb-2">
            <FaMapMarkerAlt className="text-green-600 mr-2" />
            <span className="font-semibold">Dirección:</span> {center.address}
          </p>
          <p className="text-lg flex items-center mb-2">
            <FaBuilding className="text-green-600 mr-2" />
            <span className="font-semibold">Código Postal:</span> {center.postalCode}
          </p>
          <p className="text-lg flex items-center mb-2">
            <FaPhone className="text-green-600 mr-2" />
            <span className="font-semibold">Teléfono:</span> {center.phone}
          </p>
          <p className="text-lg flex items-center mb-2">
            <FaGlobe className="text-green-600 mr-2" />
            <span className="font-semibold">Website:</span>
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
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Animales en el Refugio</h2>
        <AnimalList animals={animals} />
      </div>
    </div>
  );
};

export default CenterDetail;
