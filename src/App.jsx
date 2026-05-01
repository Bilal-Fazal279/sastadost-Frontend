import React, { useState, useMemo } from 'react';
import axios from 'axios';

import Navbar from './components/Navbar';
import SearchHero from './components/SearchHero';
import ProductCard from './components/ProductCard';
import { SkeletonGrid } from './components/SkeletonCard';
import SortDropdown from './components/SortDropdown';
const API_BASE_URL = import.meta.env.VITE_API_URL;

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('default');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (overrideQuery) => {
    const q = overrideQuery || query;
    if (!q.trim()) return;
    setLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const response = await axios.get(
        // `http://localhost:5000/api/search?q=${encodeURIComponent(q)}`
        `${API_BASE_URL}api/search?q=${encodeURIComponent(q)}`
      );
      setResults(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Search failed:', err);
      setError('Could not connect to backend. Make sure your server is running on port 5000.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChipClick = (chipQuery) => {
    setQuery(chipQuery);
    handleSearch(chipQuery);
  };

  const sortedResults = useMemo(() => {
    if (sortOrder === 'asc') {
      return [...results].sort((a, b) => (a.current_price ?? Infinity) - (b.current_price ?? Infinity));
    }
    if (sortOrder === 'desc') {
      return [...results].sort((a, b) => (b.current_price ?? 0) - (a.current_price ?? 0));
    }
    if (sortOrder === 'rating_asc') {
      return [...results].sort((a, b) => (a.rating_score ?? 0) - (b.rating_score ?? 0));
    }
    if (sortOrder === 'rating_desc') {
      return [...results].sort((a, b) => (b.rating_score ?? 0) - (a.rating_score ?? 0));
    }
    return results;
  }, [results, sortOrder]);

  return (
    <div className="min-h-screen bg-gray-50 font-inter">

      {/* Sticky Navigation */}
      <Navbar />

      {/* Search Hero */}
      <SearchHero
        query={query}
        onQueryChange={setQuery}
        onSearch={() => handleSearch()}
        onChipClick={handleChipClick}
        loading={loading}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Skeleton Loader */}
        {loading && <SkeletonGrid count={8} />}

        {/* Error State */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">Connection Error</h2>
            <p className="text-gray-500 text-sm max-w-md">{error}</p>
            <button
              onClick={() => handleSearch()}
              className="mt-6 bg-brand-orange text-white font-semibold px-6 py-2.5 rounded-full hover:bg-brand-orange-dark transition-colors"
            >
              Retry Search
            </button>
          </div>
        )}

        {/* No Results State */}
        {!loading && !error && hasSearched && sortedResults.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">No results found</h2>
            <p className="text-gray-500 text-sm">
              Try searching for "{query}" with different keywords, or pick a trending item above.
            </p>
          </div>
        )}

        {/* Results Grid */}
        {!loading && !error && sortedResults.length > 0 && (
          <>
            <SortDropdown
              sortOrder={sortOrder}
              onChange={setSortOrder}
              resultCount={sortedResults.length}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {sortedResults.map((item, index) => (
                <ProductCard
                  key={item.id || index}
                  item={item}
                  allResults={results}
                />
              ))}
            </div>
          </>
        )}

        {/* Initial Landing State (before first search) */}
        {!loading && !hasSearched && (
          <div className="py-16 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="text-7xl mb-6">💡</div>
              <h2 className="text-2xl font-black text-gray-800 mb-3">
                How SastaDost Works
              </h2>
              <p className="text-gray-500 mb-10 text-base">
                Search any product above and we'll instantly compare prices across Pakistan's top stores.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                {[
                  { emoji: '🔍', title: 'Search', desc: 'Type any product — mobile, laptop, AC, anything.' },
                  { emoji: '⚡', title: 'Compare', desc: 'We instantly pull prices from Daraz, PriceOye & more.' },
                  { emoji: '💰', title: 'Save', desc: 'Click the lowest price and buy directly from the store.' },
                ].map((step) => (
                  <div key={step.title} className="bg-white rounded-2xl p-5 shadow-card border border-gray-50">
                    <div className="text-3xl mb-3">{step.emoji}</div>
                    <h3 className="font-bold text-gray-800 mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-500">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-16 py-8 text-center text-sm text-gray-400">
        <p>
          <span className="font-bold text-gray-600">SastaDost</span> — Pakistan's Price Comparison Engine &nbsp;🇵🇰
        </p>
        <p className="mt-1">Prices updated in real-time from Daraz & other top stores.</p>
      </footer>
    </div>
  );
}

export default App;