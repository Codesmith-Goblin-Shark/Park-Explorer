import React from 'react';
import WelcomeText from './WelcomeText/WelcomeText';
import Buttons from './Buttons/Buttons';
export default function Guest() {
  return (
    <div className='flex-grow flex bg-gray-50 dark:bg-gray-900'>
      <div className='grow m-60 py-12 px-8 sm:px-10 lg:py-18 lg:px-8 lg:flex lg:items-center lg:justify-between'>
        <WelcomeText />
        <Buttons />
      </div>
    </div>
  );
}
