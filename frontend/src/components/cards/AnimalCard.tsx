import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pet } from '../../interfaces/Pet';
import { FaHeart } from "react-icons/fa";

const AnimalCard: React.FC<{ pet: Pet }> = ({ pet }) => {
  const [liked, setLiked] = useState(false); // Estado para manejar si el corazón está "liked"
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/animal/${pet.petId}`);
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  return (
    <div 
      className="relative w-full rounded-lg overflow-hidden shadow-md cursor-pointer transition-transform transform hover:scale-105"
      onClick={handleClick}
    >
      {/* Imagen de la mascota */}
      <img
        className="w-full h-72 object-cover"
        src={`/images/pets/pet_${pet.petId}/pet_1.jpg`}
        alt={`Foto de ${pet.name}`}
      />

      {/* Icono de corazón en la esquina superior derecha */}
      <FaHeart
        className={`absolute top-2 right-2 text-2xl ${liked ? 'text-red-600' : 'text-gray-400'}`}
        onClick={toggleLike}
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
