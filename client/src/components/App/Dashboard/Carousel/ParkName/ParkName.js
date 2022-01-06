import React, { useEffect } from 'react';
import { useState } from 'react';

export default function ParkName({ park }) {
  const heartOutline = 'https://www.clipartmax.com/png/full/201-2012290_heart-outline-vector-heart-clipart-coloring.png';
  const heartFilled = 'https://cdn.kapwing.com/video_image-Bz5ouo4Jn.jpg';
  let [heartStatus, changeHeart] = useState(heartOutline);

  useEffect(() => {
    //check current favorite status in db with title
    //may have to move this to where title/pictures are initially fetched and stored in state
    //if so, just pull from state here
    //display corresponding heart based on true/false status of favorite
    if(!park.fav){
      changeHeart(heartStatus = heartOutline);
    }else{
      changeHeart(heartStatus = heartFilled);
    } 
  })

  function clickHeart(){
    // changeHeart(heartStatus = (heartStatus == heartOutline) ? heartFilled : heartOutline);
    // changeHeart(heartStatus = (heartStatus == <RiHeartFill/>) ? <RiHeartLine/> : <RiHeartFill/>);

    //change heart and send server request to change favorite from true/false
    //send email in request to know what account to link to along with park name

    if(heartStatus == heartOutline){ //if not a fav
      changeHeart(heartStatus = heartFilled);
      park.fav = true;
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
        }).then((res) => res.json())
        .then((res) => {
          park.fav = res;
        });
      } catch (err) {
        console.log(err);
        throw new Error('Adding favorite failed: ', err);
      }
    }else{ //if already a fav
      changeHeart(heartStatus = heartOutline);
      park.fav = false;
      try {
        fetch('http://localhost:3000/api/users/deleteFav', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userID: 1,
            parkName: park.fullName
          })
        }).then((res) => res.json())
        .then((res) => {
          park.fav = res;
        });
      } catch (err) {
        console.log(err);
        throw new Error('Deleting favorite failed: ', err);
      }
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
