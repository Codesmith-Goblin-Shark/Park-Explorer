import React from 'react';
export default function WelcomeText() {
  return (
    <h2 className='flex flex-col items-center justify-center text-3xl font-extrabold tracking-tight text-gray-700 sm:text-4xl dark:text-gray-100'>
      <span className='block'>Looking for an adventure?</span>
      <span className='block text-yellow-600 dark:text-yellow-500'>
        Find the perfect park for your needs.
      </span>
    </h2>
  );
}
