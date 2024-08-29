import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Center } from '../../interfaces/Center';
import { FaUserPlus, FaUserCheck, FaPhone } from 'react-icons/fa'; // Asegúrate de importar ambos iconos

const CenterCard: React.FC<{ center: Center }> = ({ center }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
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
          className={`absolute top-2 right-2 text-2xl ${liked ? 'text-blue-600' : 'text-white'}`}
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
        {/* Botón abajo del todo */}
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
