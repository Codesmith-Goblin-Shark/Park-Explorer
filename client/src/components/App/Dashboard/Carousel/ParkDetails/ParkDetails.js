import React from 'react';
export default function ParkDetails({ park }) {
  return (
    <>
      <span className='h-full text-xl flex flex-col items-center justify-center '>
        <span className='block text-xl font-bold tracking-tight text-gray-700 sm:text-xl dark:text-gray-100'>
          Description: {park.description}
        </span>
      </span>
    </>
  );
}
