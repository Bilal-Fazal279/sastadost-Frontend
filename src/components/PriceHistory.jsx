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

const generateDummyHistory = (currentPrice) => {
  if (!currentPrice) return [];
  const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
  const base = currentPrice;
  return months.map((month, i) => {
    const fluctuation = (Math.random() - 0.3) * base * 0.12;
    const price = Math.round(base + fluctuation * (months.length - i));
    return { month, price: Math.max(price, Math.round(base * 0.85)) };
  });
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-3 py-2 text-sm">
        <p className="font-bold text-gray-700">{label}</p>
        <p className="text-brand-orange font-semibold">
          Rs. {payload[0].value?.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const PriceHistory = ({ currentPrice, productName }) => {
  const data = [
    ...generateDummyHistory(currentPrice),
    { month: 'Now', price: currentPrice },
  ];

  const prices = data.map((d) => d.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const yPadding = Math.round((maxPrice - minPrice) * 0.2) || 500;

  return (
    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          📈 6-Month Price Trend
        </p>
        <span className="text-[10px] text-gray-400">*Estimated historical data</span>
      </div>

      <ResponsiveContainer width="100%" height={130}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[minPrice - yPadding, maxPrice + yPadding]}
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            width={30}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={minPrice} stroke="#16A34A" strokeDasharray="4 4" strokeWidth={1} />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#FF6600"
            strokeWidth={2.5}
            dot={{ fill: '#FF6600', r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#FF6600', stroke: '#fff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-between mt-2 text-xs">
        <span className="text-sasta-green font-semibold">
          📉 Lowest: Rs. {minPrice.toLocaleString()}
        </span>
        <span className="text-red-500 font-semibold">
          📈 Highest: Rs. {maxPrice.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default PriceHistory;
