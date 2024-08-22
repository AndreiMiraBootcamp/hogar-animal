import React from 'react';
import { useNavigate } from 'react-router-dom';

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

const AnimalCard: React.FC<{ pet: Pet }> = ({ pet }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/animal/${pet.pet_id}`);
  };

  return (
    <div 
      className="w-full rounded-lg overflow-hidden shadow-md cursor-pointer transition-transform transform hover:scale-105"
      onClick={handleClick}
    >
      <img
        className="w-full h-48 object-cover"
        src={pet.photo_url}
        alt={`Foto de ${pet.name}`}
      />
      <div className="px-4 py-2">
        <h2 className="font-bold text-lg mb-2">{pet.name}</h2>
        <p className="text-gray-700 text-sm">{pet.description}</p>
      </div>
    </div>
  );
};

export default AnimalCard;
