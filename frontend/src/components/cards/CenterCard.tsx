import React from 'react';
import { Link } from 'react-router-dom';

interface Center {
  centerId: number;
  name: string;
  city: {
    cityId: number;
    name: string;
  };
  address: string;
  postalCode: string;
  phone: string;
  website: string;
  foundationYear: number;
  photoUrl: string;
  imageUrl?: string; // URL almacenada en el objeto del centro
}

const CenterCard: React.FC<{ center: Center }> = ({ center }) => {
  // Usar la URL de la imagen si está disponible en el objeto Center
  const imageUrl = center.imageUrl || 'http://localhost:8080/images/centers/1/image1.jpg';

  return (
    <div className="flex">
      <img src={imageUrl} alt={center.name} className="w-36 h-36 object-cover rounded mr-4" />
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
