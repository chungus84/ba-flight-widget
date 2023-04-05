const PORT = 8000;
const axios = require("axios");
const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();
app.use(cors())


app.get('/flights', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://flight-radar1.p.rapidapi.com/flights/list-by-airline',
    params: {airline: 'BA'},
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
    }
  };



  axios.request(options).then(function (response) {
    console.log(response.code);
    res.json(response.data['aircraft'].slice(0,6));
  }).catch(function (error) {
    console.error(error);
  });
})


app.listen(PORT, () => console.log('running on PORT: ' + PORT))
