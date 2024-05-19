import React, { useState, useEffect, useRef } from 'react';
import { MultiSelectProps } from '@/types';
import { categoryOptions } from '@/constants';

const MultiSelect: React.FC<MultiSelectProps> = ({ options, selectedOptions, onChange }) => {
  const [showOptions, setShowOptions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleOptionToggle = (optionValue: string) => {
    const newSelectedOptions = selectedOptions.includes(optionValue)
      ? selectedOptions.filter((item) => item !== optionValue)
      : [...selectedOptions, optionValue];
    onChange(newSelectedOptions);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div
        className="flex flex-wrap border border-gray-300 rounded-lg px-2 py-2.5 items-center cursor-pointer"
        onClick={() => setShowOptions((prev) => !prev)}
      >
        {selectedOptions.length > 0 ? (
          selectedOptions.map((option) => (
            <div
              key={option}
              className="flex items-center m-1 bg-teal-100 text-teal-700 rounded-full px-2 py-1"
            >
              <span className="text-xs">{option}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 ml-2 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOptionToggle(option);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          ))
        ) : (
          <span className="text-gray-400">Select category</span>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 ml-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {showOptions && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto">
          {options.map((optionLabel, index) => {
            const optionValue = categoryOptions[index].value; // Assuming categoryOptions is accessible here
            return (
              <div
                key={optionValue}
                className={`flex items-center p-2 cursor-pointer hover:bg-teal-100 ${selectedOptions.includes(optionValue) ? 'bg-teal-100' : ''}`}
                onClick={() => handleOptionToggle(optionValue)}
              >
                <span className="text-gray-800">{optionLabel}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
