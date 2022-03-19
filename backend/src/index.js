//src/index.js
const express = require('express');
//Morgan je logger
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

require('dotenv').config();
//inicijaliziranje app
const app=express();

const port = process.env.PORT || 4000;

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));

app.use(express.json());

app.get('/', (req,res) => {
    res.json({
        poruka: "Hello there",
    });
});
