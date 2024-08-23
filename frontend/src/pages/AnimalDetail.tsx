import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPetById } from '../api/pets'; // Ajusta la ruta según sea necesario
import { Pet } from '../interfaces/pet';

const AnimalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        if (id) {
          // Obtener el animal con el ID proporcionado
          const petData = await getPetById(Number(id));
          setPet(petData);
        }
      } catch (err) {
        setError('Failed to fetch pet data');
      } finally {
        setLoading(false);
      }
    };

    fetchPetData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!pet) {
    return <div>No se encontró el animal.</div>;
  }

  return (
    <div className="mt-4 p-4 flex flex-col lg:flex-row items-center lg:items-start">
      <img
        src={`/images/pets/pet_${pet.petId}.jpg`}
        alt={pet.name}
        className="w-full lg:w-1/2 h-72 object-cover mb-4 lg:mb-0 lg:mr-4 rounded-lg shadow-lg"
      />
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
