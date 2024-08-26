import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AutoComplete from '../others/AutoComplete';
import { FaDog, FaCat, FaQuestion } from 'react-icons/fa';

const Filtros: React.FC = () => {
  const [provincia, setProvincia] = useState('');
  const [animal, setAnimal] = useState<string | null>(null); // Cambia el tipo de estado
  const navigate = useNavigate();

  const provincias = [
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

  const handleSearch = () => {
    navigate('/resultados', {
      state: { search: provincia, animal }
    });
  };

  const animals = [
    { name: 'Perro', value: 'dog', icon: <FaDog size={40} /> },
    { name: 'Gato',  value: 'cat', icon: <FaCat size={40} /> },
    { name: 'Otro',  value: 'other', icon: <FaQuestion size={40} /> },
  ];

  const handleAnimalClick = (value: string) => {
    setAnimal(currentAnimal => currentAnimal === value ? null : value);
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
                  options={provincias}
                  value={provincia}
                  onChange={setProvincia}
                  onSelect={setProvincia}
                />
              </div>
              <div className="w-full">
                <div className="flex justify-center space-x-4 flex-wrap">
                  {animals.map((animalOption) => (
                    <button
                      key={animalOption.value}
                      className={`p-4 rounded-lg flex flex-col items-center 
                        ${animal === animalOption.value ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'}`}
                      onClick={() => handleAnimalClick(animalOption.value)}
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
