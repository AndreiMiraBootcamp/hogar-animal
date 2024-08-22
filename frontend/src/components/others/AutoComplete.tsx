import React, { useState } from 'react';

interface AutoCompleteProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  onSelect: (option: string) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ options, value, onChange, onSelect }) => {
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
    setFilteredOptions(options.filter(option =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    ));
    setIsOpen(true);
  };

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 100)}
        className="w-full p-3 border border-gray-300 rounded-lg"
        placeholder="Introduzca Província, Ciudad, CP..."
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
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
