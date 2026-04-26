import React from 'react';

const TRENDING = [
  'Samsung Galaxy S24',
  'iPhone 15',
  'Dell Laptop',
  'AirPods Pro',
  'PlayStation 5',
  'Xiaomi 14',
  'HP Pavilion',
  'JBL Speaker',
];

const SearchHero = ({ query, onQueryChange, onSearch, onChipClick, loading }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onSearch();
  };

  return (
    <section className="bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 pt-14 pb-16 px-4">
      <div className="max-w-3xl mx-auto text-center">

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-3">
          Find the <span className="underline decoration-wavy decoration-white/60">Lowest Price</span>
          <br className="hidden sm:block" /> in Pakistan 🇵🇰
        </h1>
        <p className="text-orange-100 text-base sm:text-lg mb-8 font-medium">
          Compare prices across Daraz, PriceOye, Telemart & more — instantly.
        </p>

        {/* Search Bar */}
        <div className="flex items-center bg-white rounded-2xl shadow-xl overflow-hidden p-1.5 max-w-2xl mx-auto">
          <div className="pl-3 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </div>
          <input
            id="main-search-input"
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search mobiles, laptops, headphones..."
            className="flex-1 px-3 py-3 text-gray-800 text-base outline-none bg-transparent placeholder-gray-400"
          />
          <button
            id="main-search-btn"
            onClick={onSearch}
            disabled={loading}
            className="bg-brand-orange hover:bg-brand-orange-dark disabled:opacity-60 text-white font-bold px-6 py-3 rounded-xl transition-all active:scale-95 whitespace-nowrap text-sm sm:text-base"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                Searching...
              </span>
            ) : 'Find Best Price'}
          </button>
        </div>

        {/* Trending Chips */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <span className="text-orange-100 text-xs font-semibold uppercase tracking-wider self-center mr-1">
            🔥 Trending:
          </span>
          {TRENDING.map((item) => (
            <button
              key={item}
              id={`chip-${item.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => onChipClick(item)}
              className="bg-white/20 hover:bg-white/35 text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/30 transition-all hover:scale-105 active:scale-95"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchHero;
