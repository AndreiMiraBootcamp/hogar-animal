import React, { useState, useEffect } from 'react';

interface AutoCompleteProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  onSelect: (option: string) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ options, value, onChange, onSelect, onKeyPress }) => {
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  useEffect(() => {
    if (value) {
      const filtered = options.filter(option =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [value, options]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setHighlightedIndex(-1);
  };

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  const handleInputBlur = () => {
    setTimeout(() => setIsOpen(false), 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onKeyPress) {
      onKeyPress(e);
    }
    
    if (e.key === 'ArrowDown' && highlightedIndex < filteredOptions.length - 1) {
      setHighlightedIndex(prevIndex => prevIndex + 1);
    } else if (e.key === 'ArrowUp' && highlightedIndex > 0) {
      setHighlightedIndex(prevIndex => prevIndex - 1);
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0) {
        onSelect(filteredOptions[highlightedIndex]);
      } else if (filteredOptions.length === 1) {
        onSelect(filteredOptions[0]);
      }
      setIsOpen(false);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onKeyPress={onKeyPress}
        onFocus={() => setIsOpen(true)}
        onBlur={handleInputBlur}
        className="w-full p-3 border border-gray-300 rounded-lg"
        placeholder="Introduzca Provincia, Ciudad, CP..."
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.map((option, index) => ( 
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`p-2 cursor-pointer hover:bg-gray-100 ${
                highlightedIndex === index ? 'bg-gray-200' : ''
              }`}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {option}
            </li>

          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
