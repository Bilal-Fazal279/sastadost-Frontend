import React from 'react';

const SORT_OPTIONS = [
  { value: 'default', label: '✨ Relevance' },
  { value: 'asc', label: '💰 Price: Low to High' },
  { value: 'desc', label: '💎 Price: High to Low' },
  { value: 'rating_asc', label: '⭐ Rating: Low to High' },
  { value: 'rating_desc', label: '⭐ Rating: High to Low' },
];

const SortDropdown = ({ sortOrder, onChange, resultCount }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">

      <p className="text-sm text-gray-500 font-medium">
        <span className="font-bold text-gray-800">{resultCount}</span> results found
      </p>

      <div className="flex items-center gap-2">
        <label htmlFor="sort-select" className="text-sm font-semibold text-gray-600 whitespace-nowrap">
          Sort by:
        </label>
        <select
          id="sort-select"
          value={sortOrder}
          onChange={(e) => onChange(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold text-gray-700 bg-white shadow-sm hover:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/30 transition-all cursor-pointer"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortDropdown;
