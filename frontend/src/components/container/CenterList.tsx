import React, { useState } from 'react';
import CenterCard from '../cards/CenterCard';
import { Center } from '../../interfaces/Center';

interface CenterListProps {
  centers: Center[];
  searchQuery: string;
}

const CenterList: React.FC<CenterListProps> = ({ centers, searchQuery }) => {
  const [animalTypeFilter, setAnimalTypeFilter] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>('default');

  const handleAnimalTypeChange = (type: string) => {
    setAnimalTypeFilter((prev) =>
      prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]
    );
  };

  const filteredCenters = centers
    .filter((center) => {
      // Integración del filtro global (searchQuery)
      const globalFilter = searchQuery.toLowerCase();
      const matchesGlobalFilter =
        center.name.toLowerCase().includes(globalFilter) ||
        center.city.name.toLowerCase().includes(globalFilter) ||
        center.address.toLowerCase().includes(globalFilter);

      return (
        matchesGlobalFilter &&
        (animalTypeFilter.length === 0 ||
          animalTypeFilter.some((type) => center.name.toLowerCase().includes(type.toLowerCase())))
      );
    })
    .sort((a, b) => {
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'city') {
        return a.city.name.localeCompare(b.city.name);
      }
      return 0;
    });

  return (
    <div>
      <h2 className="text-2xl font-bold m-1 mx-auto w-fit">Centros Disponibles</h2>
      <div className="flex flex-col md:flex-row p-4 items-start">
        <div className="md:w-1/4 w-full mb-4 md:mb-0 shadow rounded-lg m-2"> 
          <h2 className="border-b p-4 text-xl font-bold">Filtrar por:</h2>

          <div className="border-b p-4">
            <h3 className="font-semibold mb-2">Tipo de Animal</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={animalTypeFilter.includes('perros')}
                  onChange={() => handleAnimalTypeChange('perros')}
                />
                Perros
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={animalTypeFilter.includes('gatos')}
                  onChange={() => handleAnimalTypeChange('gatos')}
                />
                Gatos
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={animalTypeFilter.includes('otros')}
                  onChange={() => handleAnimalTypeChange('otros')}
                />
                Otros
              </label>
            </div>
          </div>

          <div className="p-4">
            <label className="block font-semibold mb-2">Ordenar por</label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="default">Por defecto</option>
              <option value="name">Nombre</option>
              <option value="city">Ciudad</option>
            </select>
          </div>
        </div>

        <div className="flex-grow p-2 w-full"> {/* Ocupa todo el ancho en pantallas pequeñas */}
          <div className="space-y-4">
            {filteredCenters.map((center) => (
              <div key={center.centerId} className="bg-gray-100 shadow-lg rounded-lg p-4 w-full md:w-auto"> {/* Adapta el ancho del card */}
                <CenterCard center={center} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterList;
