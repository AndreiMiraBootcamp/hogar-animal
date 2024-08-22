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

export const useFetchCenters = () => {
  const [centers, setCenters] = useState<{ name: string; position: Coordinates; phone: string; website: string; photoURL: string }[]>([]);
  const [filteredCenters, setFilteredCenters] = useState<{ name: string; position: Coordinates; phone: string; website: string; photoURL: string }[]>([]);

  const getCoordinatesFromAddress = async (
    address: string,
    postalCode: string
  ): Promise<Coordinates | null> => {
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
      const centerPromises = centersData.map(async (center: Center) => {
        const coordinates = await getCoordinatesFromAddress(center.address, center.postal_code);

        if (coordinates) {
          return {
            name: center.name,
            position: coordinates,
            phone: center.phone,
            website: center.website,
            photoURL: center.photoURL,
          };
        }
        return null;
      });

      const centersWithCoordinates = (await Promise.all(centerPromises)).filter((center) => center !== null) as { name: string; position: Coordinates; phone: string; website: string; photoURL: string }[];
      setCenters(centersWithCoordinates);
      setFilteredCenters(centersWithCoordinates);
    };

    fetchCenterCoordinates();
  }, []);

  return { centers, filteredCenters, setFilteredCenters };
};
