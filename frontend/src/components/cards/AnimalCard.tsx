import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pet } from '../../interfaces/pet';

const AnimalCard: React.FC<{ pet: Pet }> = ({ pet }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/animal/${pet.petId}`);
  };

  return (
    <div 
      className="w-full rounded-lg overflow-hidden shadow-md cursor-pointer transition-transform transform hover:scale-105"
      onClick={handleClick}
    >
      <img
        className="w-full h-72 object-cover"
        src={`/images/pets/pet_${pet.petId}.jpg`}
        alt={`Foto de ${pet.name}`}
      />
      <div className="px-4 py-2 h-36">
      <h1 className="font-bold text-3xl mb-2">{pet.name}</h1>
        <h2 className="font-medium text-lg mb-2">{pet.breed}, {pet.age} años</h2>
        <p className="text-gray-700 text-sm">{pet.description}</p>
      </div>
    </div>
  );
};

export default AnimalCard;
