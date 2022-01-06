import React,{useState} from 'react'
import ReactMapGl, {Marker} from 'react-map-gl'
import mapsKey from '../../../../api_key/key'
import marker from './images/map_marker.png'

export default function Map ({coordinates}) {

  const latitude = Number(coordinates.lat)
  const longitude = Number(coordinates.lng)

  const[viewport, setViewport] = useState({
    latitude,
    longitude,
    width: '350px',
    height: '350px',
    zoom: 7
  })
  return (
    <div>
      <ReactMapGl {...viewport} 
      mapboxApiAccessToken = {mapsKey}
      mapStyle = 'mapbox://styles/idanmichael/cky27vmo53tn214qgqs3nxefg'
      onViewportChange = {viewport => {
        setViewport(viewport)
      }}
      >
        <Marker latitude = {latitude} longitude = {longitude}>
          <button style = {{width: '60px', height:'80px'}}>
            <img src = {marker}/>
          </button>
        </Marker>
      </ReactMapGl>
    </div>
  )
}