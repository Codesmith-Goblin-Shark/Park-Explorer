import React from 'react';
import Guest from './Guest/Guest';

function App() {
  return (
    <div className='flex justify-content: space-between min-h-screen'>
      {/* {isLoggedIn ? <Favorites /> : <Guest />} */}
      <Guest />
    </div>
  );
}

export default App;
