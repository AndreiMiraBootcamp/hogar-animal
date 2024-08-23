import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AutoComplete from '../others/AutoComplete';
import { FaDog, FaCat, FaQuestion } from 'react-icons/fa'; 

const Filtros: React.FC = () => {
  const [provincia, setProvincia] = useState('');
  const [animal, setAnimal] = useState('');
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
      state: { provincia, animal }
    });
  };

  const animals = [
    { name: 'Perro', value: 'dog', icon: <FaDog size={40} /> },
    { name: 'Gato',  value: 'cat', icon: <FaCat size={40} /> },
    { name: 'Otro',  value: 'other', icon: <FaQuestion size={40} /> },
  ];

  return (
    <div className="relative w-[1520px] h-[400px] ">
      <video 
        autoPlay 
        muted 
        loop 
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="images/bg-video.mp4" type="video/mp4" />
        Tu navegador no admite este vídeo.
      </video>

      <div className="relative flex justify-center items-start w-full">
        <div className="w-3/4 mt-12 p-6 bg-black bg-opacity-30 rounded-lg max-w-4xl">
          <div className="flex flex-col space-y-6 mb-6">
            <div className="flex-1">
              <AutoComplete
                options={provincias}
                value={provincia}
                onChange={setProvincia}
                onSelect={setProvincia}
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-center space-x-4"> {/* Centra los iconos horizontalmente */}
                {animals.map((animalOption) => (
                  <button
                    key={animalOption.value}
                    className={`p-4 rounded-lg flex flex-col items-center 
                      ${animal === animalOption.value ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'}`}
                    onClick={() => setAnimal(animalOption.value)}
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
  );
}

export default Filtros;
