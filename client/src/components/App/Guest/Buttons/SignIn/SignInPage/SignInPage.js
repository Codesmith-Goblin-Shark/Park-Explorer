import React from 'react';
import SignInPageHeader from './SignInPageHeader/SignInPageHeader';
import SignInForm from './SignInForm/SignInForm';
export default function SignInPage() {
  return (
    <>
      <div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <SignInPageHeader />
          <SignInForm />
        </div>
      </div>
    </>
  );
}
