import React from 'react';
import { Link } from 'react-router-dom';
import { FcKey, FcPrivacy } from 'react-icons/fc';
export default function SignInPageHeader() {
  return (
    <>
      <div>
        <div className='flex flex-col justify-center'>
          <FcKey className='h-16 w-auto' />
          <FcPrivacy className='h-16 w-auto' />
        </div>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-700 dark:text-gray-300'>
          Sign into your account
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Or{' '}
          <Link
            to='/new+user'
            className='font-medium text-yellow-600 hover:text-yellow-500'
          >
            Create an account
          </Link>
        </p>
      </div>
    </>
  );
}
