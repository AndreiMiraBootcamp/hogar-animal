import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AnimalCard from '../../components/cards/AnimalCard';
import { Pet } from '../../interfaces/pet';
import { getAllPets } from '../../api/pets';

interface LocationState {
  provincia: string; // No se usa en esta versión
  animal: string;    // Tipo de especie para filtrar
}

const Resultados: React.FC = () => {
  const location = useLocation();
  const { animal } = location.state as LocationState;

  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPetsData = async () => {
      try {
        const allPets = await getAllPets();
        setPets(allPets);
      } catch (err) {
        setError('Failed to fetch pets data');
      } finally {
        setLoading(false);
      }
    };

    fetchPetsData();
  }, []);

  // Filtrar mascotas basadas en el tipo de especie
  const filteredPets = pets.filter((pet: Pet) => {
    return animal ? pet.species === animal : true;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full flex flex-col items-center p-6">
      <div className="w-full p-6 bg-white shadow-md rounded-lg mb-6">
        <h1 className="text-2xl font-bold mb-4">Resultados de la búsqueda</h1>
      </div>

      <div className="w-full p-6 mb-6">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
            <div key={pet.petId} className="px-2 mb-4">
              <AnimalCard pet={pet} />
            </div>
          ))
        ) : (
          <p>No se encontraron resultados para tu búsqueda.</p>
        )}
      </div>
    </div>
  );
};

export default Resultados;
