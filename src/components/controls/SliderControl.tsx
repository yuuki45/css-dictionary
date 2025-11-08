'use client';

interface SliderControlProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  unit: string;
  onChange: (value: number) => void;
}

export function SliderControl({
  label, min, max, step, value, unit, onChange
}: SliderControlProps) {
  return (
    <div className="slider-control mb-4">
      <label className="text-sm font-medium mb-2 block text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="slider-wrapper flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                     [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500
                     [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md
                     [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full
                     [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:cursor-pointer
                     [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md"
        />
        <span className="value-display text-sm font-mono min-w-[60px] text-right text-gray-900 dark:text-gray-100">
          {value}{unit}
        </span>
      </div>
      <div className="min-max flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}
