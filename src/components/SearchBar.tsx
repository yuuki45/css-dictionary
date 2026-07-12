import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export function SearchBar({ value, onChange, placeholder = "プロパティを検索...", inputRef }: SearchBarProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-10 pr-10 py-3 text-lg bg-transparent
                 border-0 border-b-2 border-gray-300 dark:border-gray-600 rounded-none
                 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 placeholder:text-base
                 focus:outline-none focus:ring-0 focus:border-vermillion-500 dark:focus:border-gold-400 transition-colors"
        placeholder={placeholder}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}