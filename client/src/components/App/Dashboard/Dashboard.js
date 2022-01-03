import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [parks, setParks] = useState([]);

  useEffect(() => {
    const fetchData = async (route) => {
      try {
        const url = `https://developer.nps.gov/api/v1/${route}?limit=157&q=designation%3D%22National%20Park%22&sort=&api_key=Z4psul3z0acso6VKsm1FmpI8nIlQR55XVbN5hxUj`;
        const res = await fetch(url);
        // how is this .json method accessible when it isn't visible on the response object🤔😵
        const { data } = await res.json();
        console.log(data);
        setParks(data);
      } catch (error) {
        console.log(`There was an error fetching the data at ${route}`, error);
      }
    };
    fetchData('parks');
  }, []);

  return (
    <>
      <div className='h-screen flex-grow flex bg-gray-50 dark:bg-gray-900'>
        <div className='grow m-60 py-12 px-8 sm:px-10 lg:py-18 lg:px-8 lg:items-center lg:justify-between'>
          {/* <h2 className='h-full flex flex-col items-center justify-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100'>
            <span className='block'>WELCOME TO THE DASHBOARD</span>
            <span className='animate-ping block text-indigo-600 dark:text-indigo-500'>
              WOW
            </span>
          </h2> */}
          {parks.map((park) => (
            <h3 className='text-emerald-500' key={park.id}>
              {park.fullName}
            </h3>
          ))}
        </div>
      </div>
    </>
  );
}
