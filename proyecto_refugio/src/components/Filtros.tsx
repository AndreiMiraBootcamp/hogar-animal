import React, { useState } from 'react';

const Filtros: React.FC = () => {
  const [provincia, setProvincia] = useState('');
  const [animal, setAnimal] = useState('');

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

  const animales = [
    'Perro', 'Gato', 'Ave', 'Caballo', 'Otro'
  ];

  return (
    <div className="w-4/4 p-6 bg-white shadow-md">
      <h2 className="text-2xl mb-6 font-semibold text-gray-800">Filtros</h2>
      <div className="mb-6">
        <label className="block mb-2 text-lg text-gray-700">Provincia:</label>
        <select
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={provincia}
          onChange={(e) => setProvincia(e.target.value)}
        >
          <option value="">Seleccione una provincia</option>
          {provincias.map((prov) => (
            <option key={prov} value={prov}>{prov}</option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-lg text-gray-700">Animal:</label>
        <select
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={animal}
          onChange={(e) => setAnimal(e.target.value)}
        >
          <option value="">Seleccione un animal</option>
          {animales.map((ani) => (
            <option key={ani} value={ani}>{ani}</option>
          ))}
        </select>
      </div>
      <button className="bg-indigo-500 text-white p-3 w-full rounded-lg hover:bg-indigo-600">Buscar</button>
    </div>
  );
}

export default Filtros;
