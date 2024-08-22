import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (onSearch) {
      onSearch(query);
    } else {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-2">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Buscar..."
        className="p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
      <button
        type="submit"
        className="p-2 text-sm bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
