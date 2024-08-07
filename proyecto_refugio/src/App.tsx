import React from 'react';
import Filtros from './components/Filtros';


const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-indigo-500 text-white p-6 shadow-md">
        <h1 className="text-4xl font-bold">Refugios</h1>
      </header>
      <main className="flex flex-1">
        <Filtros />

      </main>
    </div>
  );
}

export default App;
