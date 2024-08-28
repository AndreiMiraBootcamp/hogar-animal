import React, { useEffect, useState } from 'react';
import Mapa from '../components/others/Mapa';
import CenterList from '../components/container/CenterList';
import { Center } from '../interfaces/Center';
import { loadCenters } from '../api/centers'; // Importar la función desde la API

const Centers: React.FC = () => {
  const [centers, setCenters] = useState<Center[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const loadCentersData = async () => {
      try {
        const centersData = await loadCenters();
        setCenters(centersData);

        // Escuchar el evento para actualizar los datos si cambian
        const handleStorageUpdate = () => {
          const updatedCenters = localStorage.getItem('centers');
          if (updatedCenters) {
            setCenters(JSON.parse(updatedCenters));
          }
        };

        window.addEventListener('centers-updated', handleStorageUpdate);

        return () => {
          window.removeEventListener('centers-updated', handleStorageUpdate);
        };
      } catch (error) {
        setError('Error al cargar los datos de la API');
      } finally {
        setLoading(false);
      }
    };

    loadCentersData();
  }, []);

  if (loading) {
    return <div>Cargando centros...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full flex flex-col">
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