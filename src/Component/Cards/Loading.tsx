import React from "react";
import { memo } from "react";

function Loading() {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center items-center'>
      <div className='text-center'>
        {/* Animated Logo */}
        <div className='mb-8'>
          <div className='relative'>
            <div className='w-16 h-16 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin mx-auto'></div>
            <div className='absolute inset-0 w-16 h-16 border-4 border-transparent border-r-red-300 rounded-full animate-spin mx-auto' style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
          </div>
        </div>
        
        {/* Loading Text */}
        <h2 className='text-2xl font-semibold text-gray-800 mb-2'>Loading...</h2>
        <p className='text-gray-600'>Please wait while we prepare your experience</p>
        
        {/* Progress Dots */}
        <div className='flex justify-center space-x-2 mt-6'>
          <div className='w-2 h-2 bg-red-500 rounded-full animate-bounce'></div>
          <div className='w-2 h-2 bg-red-500 rounded-full animate-bounce' style={{animationDelay: '0.1s'}}></div>
          <div className='w-2 h-2 bg-red-500 rounded-full animate-bounce' style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
}

export default memo(Loading);


