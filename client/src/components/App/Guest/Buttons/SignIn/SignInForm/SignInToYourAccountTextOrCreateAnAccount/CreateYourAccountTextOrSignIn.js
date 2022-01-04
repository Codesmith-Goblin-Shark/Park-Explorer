import React from 'react';
import { Link } from 'react-router-dom';
import { FcBusinessman, FcBusinesswoman } from 'react-icons/fc';
export default function CreateYourAccountTextOrSignIn() {
  return (
    <>
      <div>
        <div className='flex justify-center'>
          <FcBusinessman className='h-16 w-auto' />
          <FcBusinesswoman className='h-16 w-auto' />
        </div>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-700 dark:text-gray-300'>
          Create your account
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Or{' '}
          <Link
            to='/'
            className='font-medium text-yellow-600 hover:text-yellow-500'
          >
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
}
