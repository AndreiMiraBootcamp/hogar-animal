import React from 'react';
import Mapa from '../components/others/Mapa';
import CenterList from '../components/container/CenterList';



const Centers: React.FC = () => {


  return (
    <div className="w-full flex flex-col">
      
        <div className="p-4">
          <Mapa />
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Centros Disponibles</h2>
            <CenterList />

          </div>
        </div>
      </div>
  );
};

export default Centers;
