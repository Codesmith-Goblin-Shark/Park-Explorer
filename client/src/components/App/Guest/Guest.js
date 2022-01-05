import React from 'react';
import WelcomeText from './WelcomeText/WelcomeText';
import Buttons from './Buttons/Buttons';
export default function Guest() {
  return (
    <div className='flex bg-gray-300 dark:bg-gray-800'>
      <div className='flex-1 mx-5 py-0 px-8 px-10 py-18 px-8 flex items-center justify-center min-w-1/2'>
        <WelcomeText />
        <Buttons />
      </div>
      <div className='flex-1 full inset-y-0 right-0 w-full min-h-sceen'>
        <img
          className='object-cover min-h-screen'
          // className='bg-origin-border h-full w-full'
          src='https://miro.medium.com/max/8422/1*H2aH5K9ZbZAV8s_-wEWRdA.jpeg'
          alt=''
        />
      </div>
    </div>
  );
}
