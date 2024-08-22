import React from 'react';
import Filtros from '../components/home/Filtros';
import AdoptionTips from '../components/home/AdoptionTips';
import Destacados from '../components/home/Destacados';

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