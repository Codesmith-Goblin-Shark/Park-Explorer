import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


// images must be an array of urls , if using Next JS this could something like
// const images = ['/img/img1.png', '/img/img2.png', '/img/img3.png']

export default function MoreInfoButton(parkDetails) {
  return(
  <Link
    to='/more-info'
    className='font-medium text-yellow-600 hover:text-yellow-500'
    state={{ 
      from: 'dashboard',
      parkDetails
   }}
  >
    More Info
  </Link>
  )
}