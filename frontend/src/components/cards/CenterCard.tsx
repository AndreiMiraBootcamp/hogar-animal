import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Center } from '../../interfaces/Center';
import { FaUserPlus, FaUserCheck, FaPhone } from 'react-icons/fa';
import { createFollow, deleteFollow, getFolllowsByUserId } from '../../api/follows'; // Importa la función para obtener los follows por userId

interface CenterCardProps {
  center: Center;
  userId?: number | null; // Prop opcional para el userId
}

const CenterCard: React.FC<CenterCardProps> = ({ center, userId }) => {
  const [liked, setLiked] = useState(false);

  // Verificar si el usuario sigue el centro
  const checkIfLiked = async () => {
    if (userId) {
      const follows = await getFolllowsByUserId(userId);
      const isLiked = follows.some((follow: { centerId: number }) => follow.centerId === center.centerId);
      setLiked(isLiked);
    }
  };

  useEffect(() => {
    checkIfLiked();
  }, [userId, center.centerId, liked]);

  // Alternar el estado de seguimiento
  const toggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!userId) {
      alert('Por favor, inicia sesión para seguir un centro.');
      return;
    }

    if (!liked) {
      const success = await createFollow(userId, center.centerId);
      if (success) {
        setLiked(true);
      }
    } else {
      const success = await deleteFollow(userId, center.centerId);
      if (success) {
        setLiked(false);
      }
    }
  };

  return (
    <div className="p-6 flex flex-col lg:flex-row items-center lg:items-start bg-gradient-to-r from-blue-50 to-blue-100 shadow-2xl rounded-lg">
      <div className="relative w-full lg:max-w-xs h-60 mr-6">
        <img
          src={center.imageUrl}
          alt={center.name}
          className="w-full h-full object-cover rounded-lg"
        />
        <button
          className={`absolute top-2 right-2 text-2xl ${liked ? 'text-blue-600' : 'text-blue-400'}`}
          onClick={toggleLike}
        >
          {liked ? <FaUserCheck /> : <FaUserPlus />}
        </button>
      </div>
      <div className="flex flex-col justify-between w-full h-full">
        <div>
          <h2 className="text-xl font-semibold mb-2">
            <Link to={`/center/${center.centerId}`} className="hover:underline">
              {center.name}
            </Link>
          </h2>
          <p className="text-gray-600 mb-1">{center.address}</p>
          <p className="text-gray-500 mb-1">
            <FaPhone className="inline-block mr-2 text-green-600" /> {center.phone}
          </p>
          <p className="text-gray-500">{center.city.name}</p>
        </div>
        <div className="mt-auto w-full">
          <Link
            to={`/center/${center.centerId}`}
            className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 flex items-center justify-center"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CenterCard;
