import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pet } from '../../interfaces/Pet';
import { FaHeart } from 'react-icons/fa';
import { createFavorite, deleteFavorite, getFavoritesByUserId } from '../../api/favourites';

interface AnimalCardProps {
  pet: Pet;
  userId?: number | null;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ pet, userId }) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const checkIfLiked = async () => {
    if (userId) {
      const favorites = await getFavoritesByUserId(userId);
      const isLiked = favorites.some((fav: { petId: number }) => fav.petId === pet.petId);
      setLiked(isLiked);
    }
  };

  // Cargar los likes del usuario al montar el componente o cuando se actualiza `liked`
  useEffect(() => {
    checkIfLiked();
  }, [userId, pet.petId, liked]);

  const handleClick = () => {
    navigate(`/animal/${pet.petId}`);
  };

  const toggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!userId) {
      alert('Por favor, inicia sesión para dar like a una mascota.');
      return;
    }

    if (!liked) {
      const success = await createFavorite(userId, pet.petId);
      if (success) {
        setLiked(true);
      }
    } else {
      const success = await deleteFavorite(userId, pet.petId);
      if (success) {
        setLiked(false);
      }
    }
  };

  return (
    <div
      className="relative w-full rounded-lg overflow-hidden shadow-md cursor-pointer transition-transform transform hover:scale-105"
      onClick={handleClick}
    >
      <img
        className="w-full h-72 object-cover"
        src={`/images/pets/pet_${pet.petId}/pet_1.jpg`}
        alt={`Foto de ${pet.name}`}
      />

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
