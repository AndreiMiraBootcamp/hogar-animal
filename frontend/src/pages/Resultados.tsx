import React from 'react';
import { useLocation } from 'react-router-dom';
import AnimalCard from '../components/AnimalCard';
import petData from '../JSON/pet.json';
import petData from '../JSON/adoption_centers.json'; // Asegúrate de que esta ruta sea correcta

interface Pet {
  pet_id: number;
  center_id: number;
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: string;
  description: string;
  photo_url: string;
  available: boolean;
  created_at: string;
}

interface LocationState {
  provincia: string;
  animal: string;
}

const Resultados: React.FC = () => {
  const location = useLocation();
  const { provincia, animal } = location.state as LocationState;

  // Filtrar mascotas basadas en los filtros
  const filteredPets = petData.filter((pet: Pet) => {
    // Asumiendo que la propiedad `city` en `pet` es una representación de la provincia
    const matchesProvincia = provincia ? pet.city === provincia : true;
    const matchesAnimal = animal ? pet.species === animal : true;
    return matchesProvincia && matchesAnimal;
  });

  return (
    <div className="w-full flex flex-col items-center p-6">
      <div className="w-full p-6 bg-white shadow-md rounded-lg mb-6">
        <h1 className="text-2xl font-bold mb-4">Resultados de la búsqueda</h1>
      </div>

      <div className="w-full p-6 mb-6">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
            <div key={pet.pet_id} className="px-2 mb-4">
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

