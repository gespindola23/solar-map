'use client';

import { FilterState } from '@/lib/types';

interface FiltersProps {
  states: string[];
  cities: string[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export default function Filters({ states, cities, filters, onFilterChange }: FiltersProps) {
  return (
    <div className="absolute top-6 left-6 z-10 space-y-3 min-w-[200px]">
      <select
        value={filters.state}
        onChange={(e) => onFilterChange({ ...filters, state: e.target.value, city: 'all' })}
        className="w-full px-4 py-2.5 bg-gray-900/90 border border-gray-700 rounded-lg shadow-lg text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
      >
        <option value="all">All States</option>
        {states.map(state => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>

      <select
        value={filters.city}
        onChange={(e) => onFilterChange({ ...filters, city: e.target.value })}
        className="w-full px-4 py-2.5 bg-gray-900/90 border border-gray-700 rounded-lg shadow-lg text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors disabled:opacity-50"
        disabled={cities.length === 0}
      >
        <option value="all">All Cities</option>
        {cities.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>

      {(filters.state !== 'all' || filters.city !== 'all') && (
        <button
          onClick={() => onFilterChange({ state: 'all', city: 'all' })}
          className="w-full px-4 py-2.5 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 transition-colors text-sm font-bold shadow-lg"
        >
          Reset
        </button>
      )}
    </div>
  );
}
