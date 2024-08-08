import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {


  return (
    <header className="bg-indigo-500 text-white p-6 shadow-md">
    <h1 className="text-4xl font-bold mb-2">PetFinder</h1>

    <div className="flex space-x-4">
  <Link to="/" className="hover:text-white-400">Inicio</Link>
  <Link to="/about" className="hover:text-white-400">Sobre Nosotros</Link>
  <a href="#services" className="hover:text-white-400">Colabora</a>
  <a href="#contact" className="hover:text-white-400">Contacto</a>
</div>
  </header>
  );
}

export default Header;
