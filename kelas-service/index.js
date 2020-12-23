const express = require('express')
const app = express()
const port = 8000
const dataKelas = require('./kelas');

app.get('/kelas', (req, res) => {
  console.log('request to /kelas');
  const q = req.query.q;
  if (q) {
    const filtered = dataKelas
    .filter(r => {
      const loweCaseName = r.nama.toLowerCase();
      return loweCaseName.search(q.toLowerCase()) !== -1
    });

    return res.json(filtered);
  }

  return res.json(dataKelas)
});

app.get('/kelas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log('request to /kelas/', id);
  const filtered = dataKelas.filter(r => r.id === id);
  res.json(filtered);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));