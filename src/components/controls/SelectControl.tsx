'use client';

interface SelectControlProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export function SelectControl({ label, value, options, onChange }: SelectControlProps) {
  return (
    <div className="select-control mb-4">
      <label className="text-sm font-medium mb-2 block text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                   focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
