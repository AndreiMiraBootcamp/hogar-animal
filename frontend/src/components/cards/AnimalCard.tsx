import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pet } from '../../interfaces/Pet';
import { FaHeart } from 'react-icons/fa';
import { createFavorite, deleteFavorite, getFavoritesByUserId } from '../../api/favourites';
import ErrorAlert from '../../error/ErrorAlert';

interface AnimalCardProps {
  pet: Pet;
  userId?: number | null;
  onClick?: boolean;  // onClick es un booleano opcional
}

const AnimalCard: React.FC<AnimalCardProps> = ({ pet, userId, onClick = true }) => {
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const checkIfLiked = async () => {
    if (userId) {
      try {
        const favorites = await getFavoritesByUserId(userId);
        const isLiked = favorites.some((fav: { petId: number }) => fav.petId === pet.petId);
        setLiked(isLiked);
      } catch (err) {
        setError('Error al obtener favoritos.');
      }
    }
  };

  useEffect(() => {
    checkIfLiked();
  }, [userId, pet.petId]);

  const handleClick = () => {
    navigate(`/animal/${pet.petId}`);
  };

  if (onClick){
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const toggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!userId) {
      setError('Por favor, inicia sesión para dar like a una mascota.');
      return;
    }

    try {
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
    } catch (err) {
      setError('Error al procesar la solicitud.');
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      <div
        className="relative w-full rounded-lg overflow-hidden shadow-md cursor-pointer transition-transform transform hover:scale-105"
        onClick={onClick ? handleClick : undefined}  // Condicional basado en el booleano onClick
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
      {error && <ErrorAlert message={error} />}
    </>
  );
};

export default AnimalCard;
