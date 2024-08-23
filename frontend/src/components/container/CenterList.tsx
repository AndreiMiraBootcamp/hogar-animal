import React, { useEffect, useState } from 'react';
import CenterCard from '../cards/CenterCard';

interface Center {
  centerId: number;
  name: string;
  city: {
    cityId: number;
    name: string;
  };
  address: string;
  postalCode: string;
  phone: string;
  website: string;
  foundationYear: number;
  photoUrl: string;
  imageUrl?: string; // Campo para almacenar la URL de la imagen
}

const CenterList: React.FC = () => {
  const [centers, setCenters] = useState<Center[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [cityFilter, setCityFilter] = useState<string>('');
  const [animalTypeFilter, setAnimalTypeFilter] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>('default');

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const cachedCenters = localStorage.getItem('centers');
        if (cachedCenters) {
          setCenters(JSON.parse(cachedCenters));
        } else {
          const response = await fetch('http://localhost:8080/api/adoption-centers');
          if (!response.ok) {
            throw new Error('Error al cargar los datos de la API');
          }
          const data: Center[] = await response.json();

          // Para cada centro, agregar el campo `imageUrl` con la URL de la imagen
          const centersWithImages = data.map((center) => {
            const firstImage = center.photoUrl ? center.photoUrl.split(',')[0].trim() : '';
            return {
              ...center,
              imageUrl: `http://localhost:8080/images/centers/${center.centerId}/${firstImage}`
            };
          });

          setCenters(centersWithImages);
          // Guardar los centros con las URLs de las imágenes en localStorage
          localStorage.setItem('centers', JSON.stringify(centersWithImages));
        }
      } catch (error) {
        setError('Error al cargar los datos de la API');
      } finally {
        setLoading(false);
      }
    };

    fetchCenters();
  }, []);

  if (loading) {
    return <div>Cargando centros...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleAnimalTypeChange = (type: string) => {
    setAnimalTypeFilter((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  const filteredCenters = centers
    .filter((center) => {
      return (
        (cityFilter === '' || center.city.name.toLowerCase().includes(cityFilter.toLowerCase())) &&
        (animalTypeFilter.length === 0 || animalTypeFilter.some((type) => center.name.toLowerCase().includes(type.toLowerCase())))
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
    <div className="flex space-x-4 p-4">
      <div className="w-1/4 p-4 bg-white shadow rounded-lg" style={{ height: 'auto' }}>
        <h2 className="text-xl font-bold mb-4">Filtrar por:</h2>

        <div className="border-b pb-4 mb-4">
          <label className="block font-semibold mb-2">Ciudad</label>
          <input
            type="text"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Buscar por ciudad"
          />
        </div>

        <div className="border-b pb-4 mb-4">
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

        <div className="border-b pb-4 mb-4">
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

      <div className="w-3/4">
        <h2 className="text-2xl font-bold mb-4">Centros Disponibles</h2>
        <div className="space-y-4">
          {filteredCenters.map((center) => (
            <div key={center.centerId} className="bg-white shadow-lg rounded-lg p-4">
              <CenterCard center={center} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CenterList;
