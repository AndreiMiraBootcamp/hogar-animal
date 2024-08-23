import { useState, useEffect } from 'react';
import centersData from '../JSON/adoption_centers.json';

type Coordinates = [number, number];

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

export const useFetchCenters = (searchQuery: string) => {
  const [centers, setCenters] = useState<Center[]>([]);
  const [filteredCenters, setFilteredCenters] = useState<Center[]>([]);
  const [loading, setLoading] = useState(true); // Nuevo estado para la carga

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
      setLoading(true); // Indicar que la carga ha comenzado
      const centerPromises = centersData.map(async (center: Center) => {
        const coordinates = await getCoordinatesFromAddress(center.address, center.postal_code);

        if (coordinates) {
          return {
            ...center,
            position: coordinates,
          };
        }
        return null;
      });

      const centersWithCoordinates = (await Promise.all(centerPromises)).filter((center) => center !== null) as Center[];
      setCenters(centersWithCoordinates);
      setFilteredCenters(centersWithCoordinates);
      setLoading(false); // Indicar que la carga ha terminado
    };

    fetchCenterCoordinates();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = centers.filter(center =>
        center.name.toLowerCase().includes(lowercasedQuery) ||
        center.address.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredCenters(filtered);
    } else {
      setFilteredCenters(centers);
    }
  }, [searchQuery, centers]);

  return { centers, filteredCenters, setFilteredCenters, loading };
};
