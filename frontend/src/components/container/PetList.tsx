import React from 'react';
import AnimalCard from '../cards/AnimalCard';
import { Pet } from '../../interfaces/Pet';

interface PetListProps {
  pets: Pet[]; // Asegúrate de que el componente reciba los animales como prop
}

const PetList: React.FC<PetListProps> = ({ pets }) => {
  if (pets.length === 0) {
    return <div>No hay animales disponibles en este centro.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pets.map((pet) => (
        <AnimalCard key={pet.petId} pet={pet} />
      ))}
    </div>
  );
};

export default PetList;