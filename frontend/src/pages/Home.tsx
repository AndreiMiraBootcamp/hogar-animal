import React from 'react';
import Filtros from '../components/Filtros';
import AdoptionTips from '../components/AdoptionTips';
import Destacados from '../components/Destacados';

const Home: React.FC = () => {
  return (
    
    <main className="flex flex-col items-center"> 
        <Filtros />
        <Destacados />
        <AdoptionTips />
    </main>
    
  );
};

export default Home;