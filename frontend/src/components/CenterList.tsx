import React, { useEffect, useState } from 'react';
import CenterCard from './CenterCard';
import centerData from '../JSON/adoption_centers.json';

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

const CenterList: React.FC = () => {
  const [centers, setCenters] = useState<Center[]>([]);
  

  useEffect(() => {
    // Cargar los datos desde el archivo JSON
    setCenters(centerData);
  }, []);

  return (
    <div className="flex flex-box w-full mt6">
      {centers.map((center) => (
        <div key={center.center_id} className="px-2 ">
          <CenterCard center={center} />
        </div>
      ))}
    </div>
  );
};

export default CenterList;

