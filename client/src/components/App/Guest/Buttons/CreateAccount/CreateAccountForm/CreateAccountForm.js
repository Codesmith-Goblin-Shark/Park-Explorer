import React from 'react';
import CreateYourAccountTextOrSignIn from './CreateYourAccountTextOrSignIn/CreateYourAccountTextOrSignIn';
import NewAccountForm from './NewAccountForm/NewAccountForm';
export default function CreateAccountForm() {
  return (
    <>
      <div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <CreateYourAccountTextOrSignIn />
          <NewAccountForm />
        </div>
      </div>
    </>
  );
}
