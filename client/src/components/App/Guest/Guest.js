import React from 'react';
import WelcomeText from './WelcomeText/WelcomeText';
import Buttons from './Buttons/Buttons';
export default function Guest() {
  return (
    <div className='flex-grow flex bg-gray-300 dark:bg-gray-800'>
      <div className='grow m-60 py-12 px-8 sm:px-10 lg:py-18 lg:px-8 lg:flex lg:items-center lg:justify-between'>
        <WelcomeText />
        <Buttons />
      </div>
      <div className='lg:relative lg:inset-y-0 lg:right-0 lg:w-1/2'>
        <img
          className='h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full'
          src='https://miro.medium.com/max/8422/1*H2aH5K9ZbZAV8s_-wEWRdA.jpeg'
          alt=''
        />
      </div>
    </div>
  );
}
