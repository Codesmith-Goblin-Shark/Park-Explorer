import React from 'react';
export default function WelcomeText() {
  return (
    <div className='max-w-sm'>
      <h2 className='flex flex-col mr-4 items-center justify-center text-3xl font-extrabold tracking-tight text-gray-700 sm:text-4xl dark:text-gray-100 min-w-2'>
        <span className='block'>Looking for an adventure?</span>
        <span className='block text-yellow-600 dark:text-yellow-500'>
          Find the perfect park for your needs.
        </span>
      </h2>
    </div>
  );
}
