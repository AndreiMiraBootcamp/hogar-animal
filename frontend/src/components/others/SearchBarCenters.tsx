import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        onSearch(searchQuery);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex items-center space-x-2 mb-4 w-96">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress} // Detectar cuando se presiona Enter
                className="p-2 border rounded w-full"
                placeholder="Buscar por ciudad, provincia o nombre del centro"
            />
            <button onClick={handleSearch} className="p-2 bg-gray-700 text-white rounded">
                Buscar
            </button>
        </div>
    );
};

export default SearchBar;