import React from 'react';
import { Link } from 'react-router-dom';
export default function Search({ data }) {
  // const getUser = async () => {
  //   try {
  //     const res = await fetch('/login', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         email,
  //         password,
  //       }),
  //     }).then((data) => data.json());
  //     if (res.status !== 200) throw new Error(res.status);
  //     return res;
  //   } catch (error) {
  //     throw new Error(
  //       `There was an issue adding the member to the database. ${error}`
  //     );
  //   }
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
        />
        <Link
          to='/park+id'
          className='flex-1 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
        >
          Search
        </Link>
      </div>
    </div>
  );
}
