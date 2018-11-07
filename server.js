//require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users')
const PORT = process.env.EXPRESS_HOST_PORT || 3000;
//const POSTGRES_HOSTNAME = process.env.POSTGRES_HOSTNAME;
// app.get('/', (req, res)=>{
//   res.send('hello')
// })
// console.log('hello') smokeTest
app.use(bodyParser.urlencoded({extended:true}));
app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});