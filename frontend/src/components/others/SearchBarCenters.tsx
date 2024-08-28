import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
    onResetZoom: () => void; // Función para reiniciar el zoom
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onResetZoom }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            onResetZoom();
        }
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
                onKeyPress={handleKeyPress}
                className="p-2 border rounded w-full"
                placeholder="Buscar por ciudad, provincia o nombre del centro"
            />
            <button
                onClick={handleSearch}
                className="p-2 text-white rounded bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
            >
                Buscar
            </button>
        </div>
    );
};

export default SearchBar;