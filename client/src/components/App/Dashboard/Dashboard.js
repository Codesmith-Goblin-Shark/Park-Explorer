import React, { useState, useEffect } from 'react';
import { FcBullish } from 'react-icons/fc';

export default function Dashboard() {
  const [parks, setParks] = useState([]);

  useEffect(() => {
    const get = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const fetchData = async (route) => {
      try {
        const url = `https://developer.nps.gov/api/v1/${route}?limit=157&q=designation%3D%22National%20Park%22&sort=&api_key=Z4psul3z0acso6VKsm1FmpI8nIlQR55XVbN5hxUj`;
        const res = await fetch(url, get);
        // how is this .json method accessible when it isn't visible on the response object🤔
        const { data } = await res.json();
        console.log(data);
        const result = [];
        // data is an array of objs
        for (let i = 0; i < data.length; i++) {
          result.push({
            park: data[i].fullName,
            // description: data[i].description,
            // url: data[i].url,
            images: data[i].images[0].url,
          });
        }
        setParks(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData('parks');
  }, []);

  return (
    <>
      <div className='h-screen flex-grow flex bg-gray-50 dark:bg-gray-900'>
        <div className='grow m-60 py-12 px-8 sm:px-10 lg:py-18 lg:px-8 lg:items-center lg:justify-between'>
          <h2 className='h-full flex flex-col items-center justify-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100'>
            <span className='block'>WELCOME TO THE DASHBOARD</span>
            <FcBullish className='animate-bounce mx-auto h-16 w-auto my-10' />
            <span className='animate-ping block text-indigo-600 dark:text-indigo-500'>
              WOW
            </span>
            {parks.map((park) => (
              <h3 key={park.id}>{park.fullName}</h3>
            ))}
          </h2>
        </div>
      </div>
    </>
  );
}
