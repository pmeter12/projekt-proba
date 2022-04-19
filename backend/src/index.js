//src/index.js
const express = require('express');
//Morgan je logger
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

require('dotenv').config();

//inicijaliziranje app
const middlewares = require("./middlewares");
const logs = require("./routes/log.route.js");
const app=express();

const DATABASE_CONNECTION = process.env.DATABASE_URL;

mongoose.connect(DATABASE_CONNECTION, {
    useNewUrlParser: true,
    newUnifiedTopology: true,
});

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

app.use("/api/logs", logs);

app.use(middlewares.nijePronaden);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Spojeni smo na http://localhost:${port}`);
});
