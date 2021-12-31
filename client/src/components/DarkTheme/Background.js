import React from 'react';

const Background = ({ children }) => {
  return <div className='bg-white dark:bg-gray-900 transition-all'>{children}</div>;
};

export default Background;
