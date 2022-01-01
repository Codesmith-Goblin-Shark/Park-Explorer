import React from 'react';
import { FcHome } from 'react-icons/fc';
import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <div className='absolute transition duration-500 ease-in-out rounded-full p-2'>
      <Link to='/'>
        <FcHome className='text-5xl cursor-pointer' />
      </Link>
    </div>
  );
}
