import React from 'react';
import { Link } from 'react-router-dom';

interface Center {
  center_id: number;
  user_id: number;
  name: string;
  city_id: number;
  address: string;
  postal_code: string;
  phone: string;
  website: string;
  foundation_year: number;
  photoURL: string;
}

const CenterCard: React.FC<{ center: Center }> = ({ center }) => {
  return (
    <Link to={`/center/${center.center_id}`} className="block bg-white shadow-md rounded-lg overflow-hidden">
      <img src={center.photoURL} alt={center.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{center.name}</h2>
        <p>{center.address}</p>
      </div>
    </Link>
  );
};

export default CenterCard;
