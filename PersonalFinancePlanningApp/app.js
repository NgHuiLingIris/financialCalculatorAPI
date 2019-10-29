//this file will be spinning out the express application
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const financialInstrumentRoutes = require('./api/routes/financialInstrument');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/financialInstrument',financialInstrumentRoutes);

module.exports=app;