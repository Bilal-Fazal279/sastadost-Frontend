import React, { useState } from 'react';
import PriceHistory from './PriceHistory';

const PLATFORM_LOGOS = {
  daraz: '🛍️',
  priceoye: '🏷️',
  telemart: '🛒',
  amazon: '📦',
  alibaba: '🌐',
  default: '🏪',
};

const computeDealScore = (currentPrice, originalPrice) => {
  if (!originalPrice || originalPrice <= currentPrice) return null;
  const savings = originalPrice - currentPrice;
  const pct = Math.round((savings / originalPrice) * 100);
  return Math.min(pct, 99);
};

const getDealScoreColor = (score) => {
  if (score >= 70) return 'bg-sasta-green text-white';
  if (score >= 40) return 'bg-amber-500 text-white';
  return 'bg-red-500 text-white';
};

const getPlatformLabel = (store) => {
  if (!store) return 'Market';
  const s = store.toLowerCase();
  if (s.includes('daraz')) return 'Daraz';
  if (s.includes('priceoye')) return 'PriceOye';
  if (s.includes('telemart')) return 'Telemart';
  if (s.includes('amazon')) return 'Amazon';
  if (s.includes('alibaba')) return 'Alibaba';
  return store;
};

const getPlatformEmoji = (store) => {
  if (!store) return PLATFORM_LOGOS.default;
  const s = store.toLowerCase();
  if (s.includes('daraz')) return PLATFORM_LOGOS.daraz;
  if (s.includes('priceoye')) return PLATFORM_LOGOS.priceoye;
  if (s.includes('telemart')) return PLATFORM_LOGOS.telemart;
  if (s.includes('amazon')) return PLATFORM_LOGOS.amazon;
  if (s.includes('alibaba')) return PLATFORM_LOGOS.alibaba;
  return PLATFORM_LOGOS.default;
};

const ProductCard = ({ item, allResults }) => {
  const [showHistory, setShowHistory] = useState(false);

  const dealScore = computeDealScore(item.current_price, item.original_price || item.originalPrice);

  // Build a price matrix: group items with the same name across stores
  const sameProducts = allResults
    ? allResults.filter(
        (r) =>
          r.name &&
          item.name &&
          r.name.toLowerCase().substring(0, 25) === item.name.toLowerCase().substring(0, 25)
      )
    : [item];

  const prices = sameProducts.map((r) => r.current_price).filter(Boolean);
  const lowestPrice = prices.length ? Math.min(...prices) : item.current_price;

  const savings =
    item.savings > 0
      ? item.savings
      : item.original_price && item.original_price > item.current_price
      ? item.original_price - item.current_price
      : null;

  const rating = item.rating > 0 ? item.rating : null;

  const nameLower = item.name?.toLowerCase() || '';
  const isJV = nameLower.includes('jv') || nameLower.includes(' jv');
  const isCPID = nameLower.includes('cpid');

  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group">

      {/* Image Container */}
      <div className="relative bg-gray-50 h-48 flex items-center justify-center p-4 overflow-hidden">

        {/* Deal Score Badge */}
        {dealScore !== null && (
          <div className={`absolute top-3 left-3 z-10 ${getDealScoreColor(dealScore)} text-xs font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md`}>
            <span>⚡</span>
            <span>{dealScore}% OFF</span>
          </div>
        )}

        {/* Store Badge */}
        <div className="absolute top-3 right-3 z-10 bg-white border border-gray-100 text-xs font-semibold px-2 py-1 rounded-full text-gray-600 flex items-center gap-1 shadow-sm">
          <span>{getPlatformEmoji(item.store)}</span>
          <span>{getPlatformLabel(item.store)}</span>
        </div>

        <img
          src={item.image_url || `https://placehold.co/200x180/f5f5f5/999?text=No+Image`}
          alt={item.name || 'Product'}
          className="max-h-36 max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          onError={(e) => { e.target.src = 'https://placehold.co/200x180/f5f5f5/999?text=No+Image'; }}
        />
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">

        {/* Product Name & Tags */}
        <div>
          <h2 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug min-h-[2.5rem]">
            {item.name || 'Unnamed Product'}
          </h2>
          {(isJV || isCPID) && (
            <div className="mt-1 flex gap-1">
              {isJV && <span className="bg-gray-800 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">JV Phone</span>}
              {isCPID && <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">CPID Approved</span>}
            </div>
          )}
        </div>

        {/* Price Matrix */}
        <div className="bg-gray-50 rounded-xl p-3 space-y-1.5">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Price Comparison</p>
          {sameProducts.slice(0, 3).map((r, i) => {
            const isLowest = r.current_price === lowestPrice;
            return (
              <div key={i} className={`flex items-center justify-between text-sm rounded-lg px-2 py-1 ${isLowest ? 'bg-sasta-green-light' : ''}`}>
                <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                  <span>{getPlatformEmoji(r.store)}</span>
                  <span>{getPlatformLabel(r.store)}</span>
                </span>
                <span className={`font-bold ${isLowest ? 'text-sasta-green' : 'text-gray-700'}`}>
                  Rs. {r.current_price?.toLocaleString()}
                  {isLowest && <span className="ml-1 text-[10px] bg-sasta-green text-white px-1 py-0.5 rounded-full">LOWEST</span>}
                </span>
              </div>
            );
          })}
        </div>

        {/* Rating + Savings row */}
        <div className="flex items-center justify-between">
          {rating !== null ? (
            <div className="flex items-center gap-1">
              <span className="text-amber-400 text-sm">★</span>
              <span className="text-sm font-bold text-gray-700">{rating}</span>
              {item.reviewCount > 0 && (
                <span className="text-xs text-gray-400">({item.reviewCount?.toLocaleString()})</span>
              )}
            </div>
          ) : <div />}

          {savings && (
            <span className="text-xs font-bold text-sasta-green bg-sasta-green-light px-2 py-1 rounded-full">
              Save Rs. {savings.toLocaleString()}
            </span>
          )}
        </div>

        {/* Price History Toggle */}
        <button
          id={`price-history-btn-${item.id || Math.random()}`}
          onClick={() => setShowHistory(!showHistory)}
          className="text-xs text-brand-orange hover:underline font-semibold text-left transition-colors"
        >
          {showHistory ? '▲ Hide Price History' : '▼ View Price History'}
        </button>

        {showHistory && (
          <div className="mt-1">
            <PriceHistory currentPrice={item.current_price} productName={item.name} />
          </div>
        )}

        {/* CTA Button */}
        <a
          href={item.product_url || '#'}
          target="_blank"
          rel="noreferrer"
          id={`buy-btn-${item.id || Math.random()}`}
          className="mt-auto block text-center bg-gray-900 hover:bg-black text-white font-bold py-3 rounded-xl transition-all active:scale-95 text-sm"
        >
          Check on {getPlatformLabel(item.store)}
        </a>
      </div>
    </article>
  );
};

export default ProductCard;
