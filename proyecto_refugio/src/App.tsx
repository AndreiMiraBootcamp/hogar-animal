import React from 'react';
import Filtros from './components/Filtros';
import Footer from './components/Footer';


const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-indigo-500 text-white p-6 shadow-md">
        <h1 className="text-4xl font-bold mb-2">PetFinder</h1>

        <div className="flex space-x-4">
      <a href="#home" className="hover:text-white-400">Inicio</a>
      <a href="#about" className="hover:text-white-400">Sobre Nosotros</a>
      <a href="#services" className="hover:text-white-400">Colabora</a>
      <a href="#contact" className="hover:text-white-400">Contacto</a>
    </div>
      </header>
      <main className="flex flex-1 justify-center items-center">
        <Filtros />

      </main>

      <Footer />
    </div>
  );
}

export default App;
