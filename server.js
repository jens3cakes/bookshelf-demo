//require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const productRouter = require('./routes/products.js')
const PORT = process.env.EXPRESS_HOST_PORT || 3000;

app.get('/', (req, res)=>{
  res.send('hello')
})
console.log('hello')

app.listen(PORT, (req, res)=>{
  console.log(`Server is listening on ${PORT}`);
});