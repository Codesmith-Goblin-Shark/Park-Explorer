import React from 'react'

export default function VisitingInfo ({data}) {
  const weater = data.weatherInfo
  const directions = data.directionsInfo
  const activitiesArray = data.activities

  let activities = ''
  activitiesArray.forEach(function(activity,index){
    let punctuation = ''
    if(index != activitiesArray.length - 1){
      punctuation += ', '
    }else{
      punctuation += '.'
    }

    activities += activity.name + punctuation
  })
  
  return(
    <div className='text-div' style={{marginRight:'50px'}}>
      <h1 className='head-text'>Weather</h1>
      <p className='body-text'>{weater}</p>
      <h1 className='head-text'>Directions</h1>
      <p className='body-text'>{directions}</p>
      <h1 className='head-text'>Activities</h1>
      <p className='body-text'>{activities}</p>
    </div>
  )
}