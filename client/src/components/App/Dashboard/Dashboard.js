import React, { useState, useEffect, useRef } from 'react';
import Search from './Search/Search';
import Carousel from './Carousel/Carousel';

export default function Dashboard() {
  const [parks, setParks] = useState([]);
  const [search, setSearch] = useState('');
  const allParksRef = useRef([]);
  useEffect(() => {
    const fetchData = async (route) => {
      try {
        const url = `https://developer.nps.gov/api/v1/${route}?limit=157&q=designation%3D%22National%20Park%22&sort=&api_key=VCYzAhEXHLdcdQOnR0fPJKrlhHAvazKFvZridXWJ
				`;
        const res = await fetch(url);
        // how is this .json method accessible when it isn't visible on the response object🤔😵
        const { data } = await res.json();
        const nationalParks = data.filter((park) =>
          park.designation.includes('National Park')
        );
        if (!allParksRef.current.length)
          allParksRef.current = [...nationalParks];
        setParks(nationalParks);
      } catch (error) {
        console.log(`There was an error fetching the data at ${route}`, error);
      }
    };
    fetchData('parks');
  }, []);

  const getPark = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/myparks/${search.toLowerCase()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await res.json();
      if (data.err) setParks(allParksRef.current); // if error getting data, just reset searchbar and dont update state
      if (res.status !== 200) throw new Error(res.status);
      return data;
    } catch (error) {
      setParks(allParksRef.current);
      // throw new Error(
      //   `There was an issue fetching the search query from the database. ${error}`
      // );
    }
  };

  const handleClick = async () => {
    const res = await getPark();
    if (res === undefined) {
      setParks(allParksRef.current);
    } else {
      const newParks = convertDbResponseToAPIFormat(res.parks);
      setParks(newParks);
    }
    setSearch('');
  };

  const convertDbResponseToAPIFormat = (resParks) => {
    const hash = {};
    resParks.forEach((resPark) => {
      hash[resPark.image] = resPark['image'];
      hash[resPark.park_name] = resPark['park_name'];
      hash[resPark.latitude] = resPark['latitude']; // shoutout "latititde spelling in our db"
    });
    return parks.filter(
      (park) =>
        park.images[0].url === hash[park.images[0].url] ||
        park.fullName === hash[park.fullName] ||
        park.latitude === hash[park.latitude]
    );
  };

  return (
    <>
      <div className='flex-grow flex bg-gray-50 dark:bg-gray-800'>
        <div className='grow mx-60 mt-15 py-12 px-8 sm:px-10 lg:py-18 lg:px-8 lg:items-center lg:justify-between'>
          <Search
            handleClick={handleClick}
            search={search}
            setSearch={setSearch}
          />
          <div className='w-full flex justify-center'>
            {(allParksRef.current.length || parks.length) && (
              <Carousel data={parks.length ? parks : allParksRef.current} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
