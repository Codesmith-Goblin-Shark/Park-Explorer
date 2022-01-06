import React, { useEffect } from 'react';
import { useState } from 'react';

export default function ParkName({ park }) {
  const heartOutline = 'https://www.clipartmax.com/png/full/201-2012290_heart-outline-vector-heart-clipart-coloring.png';
  const heartFilled = 'https://cdn.kapwing.com/video_image-Bz5ouo4Jn.jpg';

  useEffect(() => {
    //check current favorite status in db with title
    //may have to move this to where title/pictures are initially fetched and stored in state
    //if so, just pull from state here
    //display corresponding heart based on true/false status of favorite
  }, [])

  let [heartStatus, changeHeart] = useState(heartOutline);

  function clickHeart(){
    // changeHeart(heartStatus = (heartStatus == heartOutline) ? heartFilled : heartOutline);
    // changeHeart(heartStatus = (heartStatus == <RiHeartFill/>) ? <RiHeartLine/> : <RiHeartFill/>);

    //change heart and send server request to change favorite from true/false
    //send email in request to know what account to link to along with park name

    if(heartStatus == heartOutline){ //if not a fav
      changeHeart(heartStatus = heartFilled);
      try {
        fetch('http://localhost:3000/api/users/addFav', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userID: 1,
            parkName: park.fullName
          })
        }).then((res) => res.json());
      } catch (err) {
        console.log(err);
        throw new Error('Adding favorite failed: ', err);
      }
    }else{ //if already a fav
      changeHeart(heartStatus = heartOutline);
    }
  }
  
  return (
    <>
      <h2 className='h-full flex gap-10 items-center justify-center text-3xl font-extrabold tracking-tight text-gray-700 sm:text-4xl dark:text-gray-100'>
        <span className='block'>{park.fullName}</span>
        <span>
          <img 
            src={heartStatus} 
            onClick={clickHeart}
            className='h-8 cursor-pointer'
          ></img>
        </span>
      </h2>
    </>
  );
}
