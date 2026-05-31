import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-3 py-2 text-sm">
        <p className="font-bold text-gray-700">{label}</p>
        <p className="text-orange-500 font-semibold">
          Rs. {payload[0].value?.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const PriceHistory = ({ dbHistory = [], currentPrice }) => {
  
  // 1. Transform real database history tracking entries into graph coordinates
  const data = dbHistory.map((item) => {
    const date = new Date(item.created_at);
    
    // Formats ISO timestamps cleanly to labels like "May 9"
    const formattedDate = date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });

    return {
      month: formattedDate,
      price: parseFloat(item.price) // Guarantees math parsing safety
    };
  });

  // 2. Safeguard Fallback: If the scraper just tracked this product today,
  // the history array will be empty. We add a single point to prevent canvas breaks.
  if (data.length === 0) {
    data.push({ month: 'Now', price: parseFloat(currentPrice) });
  }

  // 3. Extract dynamic metric boundaries out of our real array values
  const prices = data.map((d) => d.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  
  // Dynamic padding calculation prevents the line chart from clipping against the component boundaries
  const yPadding = Math.round((maxPrice - minPrice) * 0.15) || 100;

  return (
    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 mt-2">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          📈 Real Price Trend
        </p>
        <span className="text-[10px] text-green-600 font-medium flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
          Live Tracking
        </span>
      </div>

      <ResponsiveContainer width="100%" height={130}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          
          {/* X-Axis accurately charts chronological tracking milestones */}
          <XAxis
            dataKey="month"
            tick={{ fontSize: 9, fill: '#9CA3AF' }}
            axisLine={false}
            tickLine={false}
          />
          
          {/* Y-Axis manages layout boundaries and formats shorthand metrics like "15k" */}
          <YAxis
            domain={[Math.max(0, minPrice - yPadding), maxPrice + yPadding]}
            tick={{ fontSize: 9, fill: '#9CA3AF' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}
            width={28}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          {/* Draws a reference line highlighting the all-time lowest recorded price point */}
          <ReferenceLine y={minPrice} stroke="#16A34A" strokeDasharray="4 4" strokeWidth={1} />
          
          <Line
            type="monotone"
            dataKey="price"
            stroke="#FF6600" // SastaDost Brand Accent Color
            strokeWidth={2.5}
            dot={{ fill: '#FF6600', r: 2.5, strokeWidth: 0 }}
            activeDot={{ r: 4.5, fill: '#FF6600', stroke: '#fff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Dynamic Summary Values */}
      <div className="flex items-center justify-between mt-2 text-[11px]">
        <span className="text-green-600 font-bold">
          📉 Lowest: Rs. {minPrice.toLocaleString()}
        </span>
        <span className="text-red-500 font-bold">
          📈 Highest: Rs. {maxPrice.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default PriceHistory;
