import React, { useState, useEffect } from 'react';

// images must be an array of urls , if using Next JS this could something like
// const images = ['/img/img1.png', '/img/img2.png', '/img/img3.png']

export default function Banner(props) {

  return(
    <div>
      <div className = 'img-text-container'>
        <h2 className='text-over-img'>
         {props.parkName}
        </h2>
      </div>
      <img className ='img-container' src={props.img}/>
    </div>
  )
}