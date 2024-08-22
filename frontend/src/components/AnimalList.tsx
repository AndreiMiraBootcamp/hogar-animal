import React from 'react';
import AnimalCard from './AnimalCard';

interface AnimalListProps {
  animals: {
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
  }[];
}

const AnimalList: React.FC<AnimalListProps> = ({ animals }) => {
  return (
    <div className="w-full flex flex-wrap gap-4">
  {animals.length > 0 ? (
    animals.map((animal) => (
      <div 
        key={animal.pet_id} 
        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
      >
        <AnimalCard pet={animal} />
      </div>
    ))
  ) : (
    <p className="w-full text-center text-gray-600">No hay animales disponibles en este refugio.</p>
  )}
</div>



  );
};

export default AnimalList;
