import React from 'react';
export default function ParkName({ park }) {
  return (
    <>
      <h2 className='h-full flex flex-col items-center justify-center text-3xl font-extrabold tracking-tight text-gray-700 sm:text-4xl dark:text-gray-100'>
        <span className='block'>{park.fullName}</span>
      </h2>
    </>
  );
}
