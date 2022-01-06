import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import InfoDisplay from './InfoDisplay';

// images must be an array of urls , if using Next JS this could something like
// const images = ['/img/img1.png', '/img/img2.png', '/img/img3.png']

export default function MoreInfoPage(props) {
  console.log(useLocation())
  return(
    <>
      <InfoDisplay parkDetails = {useLocation()}>Hello</InfoDisplay>
    </>
  )
}