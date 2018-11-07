//require('dotenv').config();
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
//const productRouter = require('./routes/products.js')
const PORT = process.env.EXPRESS_CONTAINER_PORT;

app.get('/', (req, res)=>{
  console.log('hello')
})
console.log('hello')