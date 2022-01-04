import React from 'react';
import Guest from './Guest/Guest';

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* {isLoggedIn ? <Favorites /> : <Guest />} */}
      <Guest />
    </div>
  );
}

export default App;
