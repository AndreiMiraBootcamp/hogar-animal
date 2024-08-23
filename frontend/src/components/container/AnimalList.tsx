import React, { useEffect, useState } from 'react';
import { getAllPets } from '../../api/pets';
import AnimalCard from '../cards/AnimalCard';
import { Pet } from '../../interfaces/pet';

const AnimalList: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    const fetchPets = async () => {
      const petData = await getAllPets();
      setPets(petData);
    };

    fetchPets();
  }, []);

  if (pets.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pets.map((pet) => (
        <AnimalCard key={pet.petId} pet={pet} />
      ))}
    </div>
  );
};

export default AnimalList;
