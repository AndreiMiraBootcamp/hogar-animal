import React from 'react';
import Filtros from '../components/home/Filtros';
import AdoptionTips from '../components/home/AdoptionTips';
import Destacados from '../components/home/Destacados';
import { useAuth } from '../context/AuthContext'; // Importa el hook de autenticación

const Home: React.FC = () => {
  const { userData } = useAuth();
  const userId = userData?.userId || null;

  return (
    <main className="flex flex-col items-center">
      <Filtros />
      {userId && (
        <>
          <Destacados showFavorites={true} userId={userId} />
          <Destacados showFavorites={false} userId={userId} />
        </>
      )}
      {!userId && <Destacados />}
      <AdoptionTips />
    </main>
  );
};

export default Home;
