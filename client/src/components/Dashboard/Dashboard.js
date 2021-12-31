import React from 'react';
import { FcBullish, FcCheckmark } from 'react-icons/fc';

export default function Dashboard() {
  return (
    <>
      <div className='h-screen flex-grow flex bg-gray-50 dark:bg-gray-900'>
        <div className='grow m-60 py-12 px-8 sm:px-10 lg:py-18 lg:px-8 lg:flex lg:items-center lg:justify-between'>
          <h2 className='flex flex-col items-center justify-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100'>
            <span className='block'>WELCOME TO THE DASHBOARD</span>
            <FcBullish className='animate-bounce mx-auto h-16 w-auto my-10' />
            <span className='animate-ping block text-emerald-600 dark:text-emerald-500'>WOW</span>
          </h2>
        </div>
      </div>
    </>
  );
}
