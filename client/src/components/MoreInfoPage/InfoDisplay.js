import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import Banner from './Banner';
import { Link } from 'react-router-dom';

import MapAndAddress from './MapAndAddress';
import VisitingInfo from './VisitingInfo';

// images must be an array of urls , if using Next JS this could something like
// const images = ['/img/img1.png', '/img/img2.png', '/img/img3.png']

export default function InfoDisplay(parkDetails) {
  const data = parkDetails.parkDetails.state.parkDetails.parkDetails
  console.log(data)
  const img = data.images[0].url
  const parkName = data.name
  const description = data.description
  return(
    <div>
     <Banner img={img} parkName={parkName}></Banner>
     <div style={{display:'flex',justifyContent:'center'}}>
      <div className='description-div'>
        <h1 className='head-text'>Description</h1>
        <p className='body-text'>{description}</p>
      </div>
     </div>
   
     <div className='flex-container'>
      <VisitingInfo data={data}/>
      <MapAndAddress data={data} />
     </div>
     <div style={{textAlign: 'center'}}>
        <Link
          to='/dashboard'
          className='font-large mb-7 text-yellow-600 hover:text-yellow-500 text-center'
        >
          Retun to All Parks
        </Link>
      </div>
      <br/>
    </div>

  )
}