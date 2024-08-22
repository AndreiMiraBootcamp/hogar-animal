import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import centerData from '../JSON/adoption_centers.json';
import petData from '../JSON/pet.json'; // Asegúrate de que esta ruta sea correcta
import AnimalList from '../components/AnimalList'; // Importa el nuevo componente

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

const CenterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [center, setCenter] = useState<Center | null>(null);
  const [animals, setAnimals] = useState<any[]>([]); // Usa el tipo adecuado

  useEffect(() => {
    const foundCenter = centerData.find((c) => c.center_id === Number(id));
    setCenter(foundCenter || null);

    if (foundCenter) {
      // Filtra los animales que pertenecen al refugio
      const shelterAnimals = petData.filter(pet => pet.center_id === foundCenter.center_id);
      setAnimals(shelterAnimals);
    }
  }, [id]);

  if (!center) {
    return <div>No se encontró el centro.</div>;
  }

  return (
    <div className='w-full flex'>
        
    <div className="w-1/2 p-4 flex flex-col ">
    <img src={center.photoURL} alt={center.name} className="w-full lg:w-1/2 h-64 object-cover mb-4 lg:mb-0 lg:mr-4 rounded-lg shadow-lg" />
      <div className="w-full lg:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{center.name}</h1>
        <p className="text-lg mb-2"><strong>Dirección:</strong> {center.address}</p>
        <p className="text-lg mb-2"><strong>Código Postal:</strong> {center.postal_code}</p>
        <p className="text-lg mb-2"><strong>Teléfono:</strong> {center.phone}</p>
        <p className="text-lg mb-2"><strong>Website:</strong> <a href={center.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{center.website}</a></p>
        <p className="text-lg"><strong>Año de Fundación:</strong> {center.foundation_year}</p>
      </div>

      <div className="w-full mt-6">
        <h2 className="text-2xl font-bold mb-4">Animales en el Refugio</h2>
        <AnimalList animals={animals} />
      </div>
    </div>
    </div>
  );
};

export default CenterDetail;
