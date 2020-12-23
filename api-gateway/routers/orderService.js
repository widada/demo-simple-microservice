var express = require('express');
var router = express.Router()
var qs = require('qs');
var apiAdapter = require('./apiAdapter');

const BASE_URL = 'http://localhost:5000'
const api = apiAdapter(BASE_URL);

router.get('/order', async (req, res) => {
  try {
    const order = await api.get(req.path); 
    res.send(order.data); 
  } catch (error) {
    res.send('service order not available');
  }
})

router.post('/order', async (req, res) => {
  try {
    console.log(qs.stringify(req.body));
    const order = await api.post(req.path, qs.stringify(req.body), {
      headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' }
    }); 
    // console.log(order);
    res.send(order.data); 
  } catch (error) {
    res.send('service order not available');
  }
})

module.exports = router