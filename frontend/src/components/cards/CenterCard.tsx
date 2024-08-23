import React from 'react';
import { Link } from 'react-router-dom';
import { Center } from '../../interfaces/Center';

const CenterCard: React.FC<{ center: Center }> = ({ center }) => {

  return (
    <div className="flex">
      <img src={center.imageUrl} alt={center.name} className="w-40 h-40 object-cover rounded mr-4" />
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            <Link to={`/center/${center.centerId}`} className="hover:underline">
              {center.name}
            </Link>
          </h2>
          <p className="text-gray-600">{center.address}</p>
        </div>
        <p className="text-sm text-gray-500">{center.city.name}</p>
        <Link to={`/center/${center.centerId}`} className="mt-2 text-red-500 font-bold hover:underline">
          Ver detalles
        </Link>
      </div>
    </div>
  );
};

export default CenterCard;
