import React from 'react';

const LoadingSkeleton = ({ type = 'card' }) => {
  if (type === 'card') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border dark:border-gray-700">
        <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6 animate-pulse" />
    </div>
  );
};

export default LoadingSkeleton;
