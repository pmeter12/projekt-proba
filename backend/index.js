const express=require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require("dotenv").config();

app.use(cors());

const oznakaRute=require('./rute/oznake');
const korisnikRute=require('./rute/korisnici');

app.use(express.json());

mongoose
    .connect(process.env.url_mongo,{
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true,
        useUnifiedTopology: true,
       
    })
    .then(() => {
        console.log("Spojili smo se s MongoDB bazom!");
    })
    .catch((err) => console.log(err));

app.use('/api/korisnici',korisnikRute);
app.use('/api/oznake',oznakaRute);

const PORT = 3001
app.listen(PORT, () =>{
    console.log(`Poslužitelj je na portu ${PORT} `)
})