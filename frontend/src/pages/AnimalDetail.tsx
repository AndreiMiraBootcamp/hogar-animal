import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import petData from '../JSON/pet.json'; // Asegúrate de que esta ruta sea correcta

interface Pet {
  pet_id: number;
  center_id: number;
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: string;
  description: string;
  photo_url: string;
  available: boolean;
  created_at: string;
}

const AnimalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pet, setPet] = useState<Pet | null>(null);

  useEffect(() => {
    const foundPet = petData.find((p) => p.pet_id === Number(id));
    setPet(foundPet || null);
  }, [id]);

  if (!pet) {
    return <div>No se encontró el animal.</div>;
  }

  return (
    <div className="mt-4 p-4 flex flex-col lg:flex-row items-center lg:items-start">
      <img src={pet.photo_url} alt={pet.name} className="w-full lg:w-1/2 h-72 object-cover mb-4 lg:mb-0 lg:mr-4 rounded-lg shadow-lg" />
      <div className="w-full lg:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{pet.name}</h1>
        <p className="text-lg mb-2"><strong>Especie:</strong> {pet.species}</p>
        <p className="text-lg mb-2"><strong>Raza:</strong> {pet.breed}</p>
        <p className="text-lg mb-2"><strong>Edad:</strong> {pet.age} años</p>
        <p className="text-lg mb-2"><strong>Género:</strong> {pet.gender}</p>
        <p className="text-lg mb-2"><strong>Descripción:</strong> {pet.description}</p>
        <p className="text-lg"><strong>Disponibilidad:</strong> {pet.available ? 'Disponible' : 'No Disponible'}</p>
      </div>
    </div>
  );
};

export default AnimalDetail;
