import * as React from 'react';
import {useState, useEffect} from 'react';
import {MapContainer,TileLayer,Marker,Popup} from 'react-leaflet';
import './App.css';
import {Star} from '@material-ui/icons';
import axios from 'axios';

function App() {

  
  const[oznake,setoznake] = useState([])
  const [trenutnoMjestoId,setTrenutnoMjestoId] = useState(null);
  const[novoMjesto,setNovoMjesto]=useState(null);
  


  useEffect(()=>{
    const getOznake = async() => {
      try{
        const res=await axios.get("/oznake");
        setoznake(res.data); 
      }catch(err){
        console.log(err)
      }
    };
    getOznake()
  },[]);

  const handleMarkerClick = (id) => {
    setTrenutnoMjestoId(id)
    //console.log(trenutnoMjestoId);
  }

  
  const handleNoviKlik = (lati,long) =>{
    const [lat,lng]=[lati,long]
    setNovoMjesto({
      lat,
      lng,
    })
  }
  return (
    <div className="app">
    <MapContainer
      classname="map"
      center={[45.48, 15.58]} 
      zoom ={5} 
      scrollWheelZoom={true}
      whenReady={(map) =>{
        map.target.on('click',function(e){
          handleNoviKlik(e.latlng.lat,e.latlng.lng);
        })
        
      }}
      
       
      
    >
      <TileLayer
        attribution='&copy; <ahref="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {oznake.map((p) => (
      <>
        <Marker
          position={[p.lat, p.long]}
          eventHandlers={{
            click: () => {
              handleMarkerClick(p._id);
            },      

          }}
        >
        </Marker>
        {p._id === trenutnoMjestoId && (
          <Popup
            position={[p.lat,p.long]}
            closeButton={true}
            closeOnClick={false}
            anchor="left"
            onClose={() => setTrenutnoMjestoId(null)}
          >
          <div className="kartica">
            <label>Mjesto</label>
            <h4 className="mjesto">{p.naslov}</h4>
            <label>Recenzija</label>
            <p className='opis'>{p.opis}</p>
            <label>Ocjena</label>
            <div className='zvijezdice'>
              <Star className='zvijezdica'/>
              <Star className='zvijezdica'/>
              <Star className='zvijezdica'/>
              <Star className='zvijezdica'/>
              <Star className='zvijezdica'/>
            </div>
              <label>Opis</label> 
              <span className='korisnicko_ime'><b>{p.korisnicko_ime}</b></span>
              
          </div> 
          </Popup>
        )}
      </>
      ))}
      {novoMjesto !== null && (
          <Popup
             latitude={novoMjesto.lat}
             longitude={novoMjesto.long}
             closeButton={true}
             closeOnClick={false}
             anchor="left"
             onClose={() => setNovoMjesto(null)}
           >
         </Popup>
      )}
      </MapContainer> 
    </div>
  );
}

export default App;
