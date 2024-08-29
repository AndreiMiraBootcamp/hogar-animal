import React from 'react';
import Filtros from '../components/home/Filtros';
import AdoptionTips from '../components/home/AdoptionTips';
import Destacados from '../components/home/Destacados';
import NewsCarousel from '../components/home/NewsCarrousel';

const Home: React.FC = () => {
  return (
    
    <main className="flex flex-col items-center"> 
        <Filtros />
        <Destacados />
        <h1 className="text-3xl font-bold text-center my-6">Últimas Noticias</h1>
        <NewsCarousel />
        <AdoptionTips />
    </main>
    
  );
};

export default Home;