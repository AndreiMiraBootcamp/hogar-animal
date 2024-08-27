// src/components/LoadingSpinner.tsx

import React from 'react';

interface LoadingSpinnerProps {
  loading: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  z-50">
      <img
        src="images\loading.gif" // Cambia esta ruta al path de tu GIF
        alt="Loading..."
        className="w-16 h-16"
      />
    </div>
  );
};

export default LoadingSpinner;
