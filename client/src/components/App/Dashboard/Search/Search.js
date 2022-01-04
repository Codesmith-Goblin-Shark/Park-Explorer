import React, { useState } from 'react';
export default function Search({ handleClick, search, setSearch }) {
  // const [state, setState] = useState('');

  // const handleClick = (e) => {
  //   getUser();
  //   setState('');
  // };

  return (
    <div>
      <label
        htmlFor='parkSearch'
        className='block text-4xl font-medium text-gray-700 dark:text-gray-300'
      >
        Park Search
      </label>
      <div className='flex mt-3 relative rounded-md shadow-sm'>
        <input
          type='text'
          name='parkInfo'
          id='parkInfo'
          className='flex-2 focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-7 pr-12 sm:text-sm dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-500 rounded-md'
          placeholder='Park details...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => handleClick(search)}
          // onClick={(e) => {
          //   e.preventDefault();
          //   handleClick(state);
          // }}
          className='flex-1 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
        >
          Search
        </button>
      </div>
    </div>
  );
}
