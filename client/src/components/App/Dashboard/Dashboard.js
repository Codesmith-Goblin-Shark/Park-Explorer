import React, { useState, useEffect } from 'react';
import Search from './Search/Search';
import Carousel from './Carousel/Carousel';

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
        const nationalParks = data.filter((park) =>
          park.designation.includes('National Park')
        );
        console.log(nationalParks);
        setParks(nationalParks);
      } catch (error) {
        console.log(`There was an error fetching the data at ${route}`, error);
      }
    };
    fetchData('parks');
  }, []);

  return (
    <>
      <div className='flex-grow flex bg-gray-50 dark:bg-gray-800'>
        <div className='grow mx-60 mb-60 mt-15 py-12 px-8 sm:px-10 lg:py-18 lg:px-8 lg:items-center lg:justify-between'>
          <Search />
          <div className='w-full flex justify-center'>
            {parks && <Carousel data={parks} />}
          </div>
          {/* {parks.map((park) => (
            <h3 className='text-yellow-500' key={park.id}>
              {park.fullName}
            </h3>
          ))} */}
        </div>
      </div>
    </>
  );
}
