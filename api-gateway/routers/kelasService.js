var express = require('express');
var router = express.Router()
var apiAdapter = require('./apiAdapter');

const BASE_URL = 'http://localhost:8000'
const api = apiAdapter(BASE_URL)

router.get('/kelas', async (req, res) => {
  try {
    const kelas = await api.get(req.path, { params: { q: req.query.q } }); 
    res.send(kelas.data); 
  } catch (error) {
    res.send('service kelas not available');
  }
})

router.get('/kelas/:id', async (req, res) => {
  try {
    const kelas = await api.get(req.path); 
    res.send(kelas.data); 
  } catch (error) {
    res.send('service kelas not available');
  }
})

module.exports = router