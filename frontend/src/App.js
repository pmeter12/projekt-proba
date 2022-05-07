import * as React from 'react';
import {useState, useEffect} from 'react';
import {MapContainer,TileLayer,Marker,Popup} from 'react-leaflet';
import './App.css';
import {Star} from '@material-ui/icons';
import axios from 'axios';

function App() {

  const trenutniKorisnik="petar";
  const[oznake,setoznake] = useState([])
  const [trenutnoMjestoId,setTrenutnoMjestoId] = useState(null);
  const[novoMjesto,setNovoMjesto]=useState(null);
  const[naslov,setNaslov]=useState(null);
  const[opis,setOpis]=useState(null);
  const[ocjena,setOcjena]=useState(0);


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
    console.log(trenutnoMjestoId);
  }

  
  const handleNoviKlik = (lati,long) =>{
    const [lat,lng]=[lati,long]
    setNovoMjesto({
      lat,
      lng,
    })

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const novaOznaka={
      korisnicko_ime:trenutniKorisnik,
      naslov,
      opis,
      ocjena,
      lat:novoMjesto.lat,
      long:novoMjesto.long,
    }

    try{
      const res=await axios.post("/oznake",novaOznaka);
      setoznake([...oznake,res.data]);
      setNovoMjesto(null);
    }catch(err){
      console.log(err);
    }
  }
    
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
      {novoMjesto && (
          <Popup
             latitude={novoMjesto.lat}
             longitude={novoMjesto.long}
             closeButton={true}
             closeOnClick={false}
             anchor="left"
             onClose={() => setNovoMjesto(null)}
           >
             <div>
              <form onSubmit={handleSubmit}>
              <label>Naslov</label>
              <input placeholder="Upišite naslov" onChange={(e)=> setNaslov(e.target.value)}/>
              <label>Opis</label>
              <textarea placeholder="Recite nam nešto o ovom mjestu." onChange={(e)=> setOpis(e.target.value)}/>  
              <label>Ocjena</label>
              <select onChange={(e)=> setOcjena(e.target.value)}>
                <option value="1">1</option>
                <option value="1">2</option>
                <option value="1">3</option>
                <option value="1">4</option>
                <option value="1">5</option>
              </select>
              <button className="potvrdni" type="submit">Dodaj pin</button>
             </form>
         </div>
         </Popup>
      
      )}
         
        
      

      
      </MapContainer> 
    </div>
  );
}

export default App;
