import React from 'react'
import SimpleMap from './Map'

export default function MapAndAddress ({data}) {
  const coordinates = {lat: data.latitude, lng: data.longitude}
  const parkName = data.name
  const streetAddress = data.addresses[0].line1
  const city = data.addresses[0].city
  const state = data.addresses[0].stateCode
  const cityAndState = city + ', ' + state

  return(
    <div>
      <h1 className='head-text'>Map of {parkName}</h1>
      <SimpleMap coordinates={coordinates}/>
      
      <h1 className='head-text'>Address</h1>
      <p className='body-text'>{streetAddress}</p>
      <p className='body-text'>{cityAndState}</p>
    </div>
  )
}