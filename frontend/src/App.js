import * as React from 'react';
import {useState} from 'react';
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
  const[viewPort,setViewport] = useState({
    width:"100vw",
    height:"100vh",
    latitude:46,
    longitude:17,
    zoom: 4

  });
  
  return (
    <div className="App">
      <ReactMapGL
      {...viewPort}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      mapStyle="mapbox://styles/pecka1603/cl26m394m000c16nx0xn9mkn4"
      onViewportChange={nextViewport => setViewport(nextViewport)}
      />
   </div> 
      
  );
}

export default App;
