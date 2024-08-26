import { useState, useEffect } from 'react';
import centersData from '../JSON/adoption_centers.json';

type Coordinates = [number, number];

interface Center {
  center_id: number;
  user_id: number;
  name: string;
  city_id: number;
  city_name: string; 
  province_name: string; 
  address: string;
  postal_code: string;
  phone: string;
  website: string;
  foundation_year: number;
  photoURL: string;
  position?: Coordinates; // Posición opcional
}

export const useFetchCenters = (searchQuery: string) => {
  const [centers, setCenters] = useState<Center[]>([]);
  const [filteredCenters, setFilteredCenters] = useState<Center[]>([]);
  const [loading, setLoading] = useState(true);

  const getCoordinatesFromAddress = async (address: string, postalCode: string): Promise<Coordinates | null> => {
    const fullAddress = `${address}, ${postalCode}`;
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`;
    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();
      if (data && data.length > 0) {
        const location = data[0];
        return [parseFloat(location.lat), parseFloat(location.lon)] as Coordinates;
      }
      return null;
    } catch (error) {
      console.error('Error fetching geocode data', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchCenterCoordinates = async () => {
      setLoading(true);

      const centerPromises = centersData.map(async (center) => {
        const coordinates = await getCoordinatesFromAddress(center.address, center.postal_code);

        if (coordinates) {
          return {
            ...center,
            position: coordinates,
          } as Center;
        }

        return center; // Si no hay coordenadas, devuelve el centro original
      });

      const centersWithCoordinates = (await Promise.all(centerPromises)).filter(
        (center): center is Center => center !== null
      );

      setCenters(centersWithCoordinates);
      setFilteredCenters(centersWithCoordinates);
      setLoading(false);
    };

    fetchCenterCoordinates();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = centers.filter(center => {
        // Verificar si las propiedades existen antes de llamar a toLowerCase
        const cityName = center.city_name?.toLowerCase() || '';
        const provinceName = center.province_name?.toLowerCase() || '';
        const centerName = center.name?.toLowerCase() || '';

        const cityMatches = cityName.includes(lowercasedQuery);
        const provinceMatches = provinceName.includes(lowercasedQuery);
        const nameMatches = centerName.includes(lowercasedQuery);
        
        // Priorizar coincidencias en la ciudad sobre la provincia
        if (cityMatches) return true;
        if (provinceMatches && !cityMatches) return true;
        return nameMatches;
      });

      setFilteredCenters(filtered);
    } else {
      setFilteredCenters(centers);
    }
  }, [searchQuery, centers]);

  return { centers, filteredCenters, setFilteredCenters, loading };
};
