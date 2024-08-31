import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';

type Coordinates = [number, number];
interface CenterMapOnSelectedCenterProps {
  position: Coordinates | null;
}

const CenterMapOnSelectedCenter: React.FC<CenterMapOnSelectedCenterProps> = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 13);
    }
  }, [position, map]);

  return null;
};

export default CenterMapOnSelectedCenter;
