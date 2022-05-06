import * as React from 'react';
import {MapContainer,TileLayer,Marker,Popup} from 'react-leaflet';
import './App.css';

function App() {
  
  return (
    <MapContainer center={[45.48, 15.58]} zoom ={7} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <ahref="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[45.48, 15.58]}>
        <Popup>
          Grad sa četiri rijeke. <br/>
        </Popup>
      </Marker>
    </MapContainer> 
  );
}

export default App;
