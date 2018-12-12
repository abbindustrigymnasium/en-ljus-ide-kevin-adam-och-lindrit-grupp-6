const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const lampRoutes = require('./api/routes/lampa');

//vi konstaterar vad vi vill använda

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((res, req, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if(res.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/lampa', lampRoutes);
//Vi ser till att filen lampa.js ska användas

app.use((req, res, next) => {
    const error = new Error('Rackarns nu gick det fel');
    error.status = 404;
    next(error);
})
/*Ifall något inte funkar så kommer vi få ett 404 och ett felmeddelande. Detta gäller när vi har kommit fram till backended men inte till 
någon route.*/
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;