import React from 'react';
import { Link } from 'react-router-dom';
export default function CreateAccount() {
  return (
    <>
      <div className='inline-flex rounded-md shadow'>
        <Link
          to='/new+user'
          className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:md:hover:bg-indigo-900'
        >
          Create Account
        </Link>
      </div>
    </>
  );
}
