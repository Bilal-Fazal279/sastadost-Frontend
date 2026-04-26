import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/search?q=${query}`);
      console.log("response is: ", response);
      setResults(response.data);
    } catch (err) {
      console.error("Search failed", err);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <header className="header">
        <h1 className="logo">SastaDost <span>PK</span></h1>
        <div className="search-box">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search mobile, laptops..."
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Find Best Price"}
          </button>
        </div>
      </header>

      <main className="results-grid">
        {results.map((item, index) => (
          <div key={index} className="glass-card">

            <div className="card-badge">{item.store || 'Market'}</div>

            <div className="image-container">
              <img src={item.image_url || 'https://via.placeholder.com/150'} alt={item.title} />
            </div>

            <div className="card-content">
              <h3 className="product-title">{item.name}</h3>

              {/* 2. Enhanced Pricing Section */}
              <div className="price-section">
                <div className="price-tag">
                  <span className="currency">Rs.</span>
                  <span className="amount">{item.current_price?.toLocaleString()}</span>
                </div>

                {item.discountTag && item.originalPrice && (
                  <span className="original-price">
                    Rs. {item.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* 3. Savings Callout */}
              {item.savings > 0 && (
                <p className="savings-alert">Save Rs. {item.savings.toLocaleString()}
                  {/* 1. Discount Badge */}
                  {item.discountTag && (
                    <span className="discount-badge">{item.discountTag}</span>
                  )}
                </p>


              )}

              {/* 4. Improved Rating UI */}
              {item.rating > 0 && (
                <div className="rating">
                  <span className="star">★</span> {item.rating}
                  <span className="review-count">(reviews: {item.reviewCount || 0})</span>
                </div>
              )}

              <p className="location">📍 {item.location || 'Pakistan'}</p>

              <a href={item.product_url} target="_blank" rel="noreferrer" className="buy-btn">
                View on {item.store}
              </a>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;