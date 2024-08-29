import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AutoComplete from '../others/AutoComplete';
import { FaDog, FaCat, FaQuestion } from 'react-icons/fa';

const Filtros: React.FC = () => {
  const [search, setSearch] = useState('');
  const [animal, setAnimal] = useState<string | null>(null); // Ahora permite null
  const navigate = useNavigate();

  const searchs = [
    'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila',
    'Badajoz', 'Baleares', 'Barcelona', 'Burgos', 'Cáceres', 'Cádiz',
    'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba', 'Cuenca',
    'Gerona', 'Granada', 'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca',
    'Jaén', 'La Coruña', 'La Rioja', 'Las Palmas', 'León', 'Lérida',
    'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Orense', 'Palencia',
    'Pontevedra', 'Salamanca', 'Santa Cruz de Tenerife', 'Segovia',
    'Sevilla', 'Soria', 'Tarragona', 'Teruel', 'Toledo', 'Valencia',
    'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'
  ];

  const animals = [
    { name: 'Perro', value: 'dog', icon: <FaDog size={40} /> },
    { name: 'Gato',  value: 'cat', icon: <FaCat size={40} /> },
    { name: 'Otro',  value: 'other', icon: <FaQuestion size={40} /> },
  ];

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/pets?province=${search}&species=${animal}`);
      if (!response.ok) {
        throw new Error('Error al buscar mascotas');
      }
      navigate('/resultados', { state: { search, animal } });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-x-hidden">
      <video 
        autoPlay 
        muted 
        loop 
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="images/bg-video.mp4" type="video/mp4" />
        Tu navegador no admite este vídeo.
      </video>

      <div className="relative flex flex-col items-center justify-center w-full h-full">  
        <div className="absolute top-10 p-6 text-center text-white">
          <h1 className="text-5xl font-bold mb-4 text-white" style={{ fontFamily: 'Poppins, sans-serif', textShadow: '2px 2px 10px rgba(0, 0, 0, 0.7)' }}>
            Hogar Animal
          </h1>
          <p className="text-2xl" style={{ fontFamily: 'Quicksand, sans-serif', textShadow: '1px 1px 5px rgba(0, 0, 0, 0.7)' }}>
            Encuentra a tu amigo fiel
          </p>
        </div>
        <div className="relative flex justify-center items-center w-full h-full mt-20">
          <div className="w-full md:w-3/4 lg:w-2/3 p-6 bg-black bg-opacity-30 rounded-lg">
            <div className="flex flex-col space-y-6 mb-6">
              <div className="w-full">
                <AutoComplete
                  options={searchs}
                  value={search}
                  onChange={setSearch}
                  onSelect={(option) => {
                    setSearch(option);
                    handleSearch(); // Realiza la búsqueda al seleccionar una opción
                  }}
                />
              </div>
              <div className="w-full">
                <div className="flex justify-center space-x-4 flex-wrap">
                  {animals.map((animalOption) => (
                    <button
                      key={animalOption.name}
                      className={`p-4 rounded-lg flex flex-col items-center 
                        ${animal === animalOption.value ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'}`}
                      onClick={() => setAnimal(animal === animalOption.value ? null : animalOption.value)} // Cambiado
                    >
                      {animalOption.icon}
                      <span className="mt-2 text-sm">{animalOption.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button
              className="bg-gray-700 text-white p-3 w-full rounded-lg hover:bg-gray-800"
              onClick={handleSearch}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filtros;
