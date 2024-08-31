import { useState, useEffect } from 'react';

type Coordinates = [number, number];

export const useUserPosition = () => {
  const [userPosition, setUserPosition] = useState<Coordinates | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude] as Coordinates);
        },
        (error) => {
          console.error('Error buscando la ubicación', error);
        }
      );
    }
  }, []);

  return [userPosition, setUserPosition] as const;
};
