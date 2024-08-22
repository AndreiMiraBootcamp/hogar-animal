import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchRefugio: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className='mb-4 flex justify-center items-center'>
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Buscar centro de adopción...'
        className='p-2 w-1/2 border border-gray-300 rounded-lg mr-2'
      />
      <button type='submit' className='p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800'>
        Buscar
      </button>
    </form>
  );
};

export default SearchRefugio;
