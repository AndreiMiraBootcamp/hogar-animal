import React, { useEffect, useState } from 'react';
import Mapa from '../components/others/Mapa';
import CenterList from '../components/container/CenterList';
import { Center } from '../interfaces/Center';

const Centers: React.FC = () => {
  const [centers, setCenters] = useState<Center[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/adoption-centers');
        if (!response.ok) {
          throw new Error('Error al cargar los datos de la API');
        }
        const data: Center[] = await response.json();

        // Agregar coordenadas y la URL completa de la imagen principal
        const centersWithDetails = await Promise.all(
          data.map(async (center) => {
            const coordinates = await getCoordinatesFromAddress(center.address, center.postalCode);
            const imageUrl = `http://localhost:5173/${center.photoUrl}/image_1.jpg`; // Generar la URL completa de la imagen principal
            return {
              ...center,
              position: coordinates, // Agregar coordenadas al centro
              imageUrl, // Agregar la URL completa de la imagen principal
            };
          })
        );

        setCenters(centersWithDetails);
      } catch (error) {
        setError('Error al cargar los datos de la API');
      } finally {
        setLoading(false);
      }
    };

    fetchCenters();
  }, []);

  // Función para obtener coordenadas a partir de una dirección
  const getCoordinatesFromAddress = async (address: string, postalCode: string): Promise<[number, number] | undefined> => {
    const fullAddress = `${address}, ${postalCode}`;
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

    return undefined;
  };

  if (loading) {
    return <div>Cargando centros...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full flex flex-col ">
      <div className="p-4">
        <Mapa centers={centers} searchQuery={searchQuery} onSearch={setSearchQuery} />
        <div className="p-4">
          <CenterList centers={centers} searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
};

export default Centers;
