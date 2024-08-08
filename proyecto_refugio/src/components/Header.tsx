import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí podrías hacer una redirección a una página de resultados, por ejemplo:
    navigate(`/search?q=${searchQuery}`);
  };

  return (
    <header className="text-black p-6 shadow-md flex justify-between items-center">
      <div>
        <h1 className="text-4xl font-bold mb-2">Hogar Animal</h1>
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-500">Inicio</Link>
          <Link to="/about" className="hover:text-gray-500">Sobre Nosotros</Link>
          <a href="#services" className="hover:text-gray-500">Colabora</a>
          <a href="#contact" className="hover:text-gray-500">Contacto</a>
        </div>
      </div>

      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
          placeholder="Buscar..."
        />
        <button type="submit" className="p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800">
          Buscar
        </button>
      </form>
    </header>
  );
};

export default Header;
