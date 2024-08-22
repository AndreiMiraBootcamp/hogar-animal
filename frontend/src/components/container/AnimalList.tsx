import React, { useEffect, useState } from 'react';
import { getAllPets } from '../api/apicalls';
import AnimalCard from '../cards/AnimalCard';

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
        <AnimalCard key={pet.pet_id} pet={pet} />
      ))}
    </div>
  );
};

export default AnimalList;
