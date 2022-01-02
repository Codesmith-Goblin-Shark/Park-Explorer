import React from 'react';
import CreateAccount from './CreateAccount/CreateAccount';
import SignIn from './SignIn/SignIn';
export default function Buttons() {
  return (
    <div className='mt-8 flex lg:mt-0 lg:flex-shrink-0'>
      <CreateAccount />
      <SignIn />
    </div>
  );
}
