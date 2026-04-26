import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden flex flex-col animate-pulse">

      {/* Image skeleton */}
      <div className="h-48 shimmer-bg bg-gray-200" />

      {/* Body */}
      <div className="p-4 flex flex-col gap-3">

        {/* Title */}
        <div className="space-y-2">
          <div className="h-3.5 bg-gray-200 shimmer-bg rounded-full w-full" />
          <div className="h-3.5 bg-gray-200 shimmer-bg rounded-full w-4/5" />
        </div>

        {/* Price matrix box */}
        <div className="bg-gray-100 rounded-xl p-3 space-y-2">
          <div className="h-2.5 bg-gray-200 shimmer-bg rounded-full w-1/3" />
          <div className="flex justify-between">
            <div className="h-3 bg-gray-200 shimmer-bg rounded-full w-2/5" />
            <div className="h-3 bg-gray-200 shimmer-bg rounded-full w-1/3" />
          </div>
          <div className="flex justify-between">
            <div className="h-3 bg-gray-200 shimmer-bg rounded-full w-2/5" />
            <div className="h-3 bg-gray-200 shimmer-bg rounded-full w-1/3" />
          </div>
        </div>

        {/* Rating + savings */}
        <div className="flex justify-between">
          <div className="h-3 bg-gray-200 shimmer-bg rounded-full w-1/4" />
          <div className="h-3 bg-gray-200 shimmer-bg rounded-full w-1/3" />
        </div>

        {/* History toggle */}
        <div className="h-2.5 bg-gray-200 shimmer-bg rounded-full w-1/3" />

        {/* CTA */}
        <div className="h-11 bg-gray-200 shimmer-bg rounded-xl mt-1" />
      </div>
    </div>
  );
};

export const SkeletonGrid = ({ count = 6 }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  </div>
);

export default SkeletonCard;
