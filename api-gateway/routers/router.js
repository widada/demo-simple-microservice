var express = require('express');
var router = express.Router()
var kelasService = require('./kelasService')
var orderService = require('./orderService')

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    if (req.headers.token !== 'demo123') {
      return res.json({ msg: 'Unauthorized' });
    }
    next()
})

router.use(kelasService)
router.use(orderService)

module.exports = router