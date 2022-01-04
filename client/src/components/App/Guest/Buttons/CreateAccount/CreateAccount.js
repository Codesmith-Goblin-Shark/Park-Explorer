import React from 'react';
import { Link } from 'react-router-dom';
export default function CreateAccount() {
  return (
    <>
      <div className='inline-flex rounded-md shadow'>
        <Link
          to='/new+user'
          className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-50 bg-yellow-600 dark:bg-yellow-600 hover:bg-yellow-700 dark:md:hover:bg-yellow-800'
        >
          Create Account
        </Link>
      </div>
    </>
  );
}
