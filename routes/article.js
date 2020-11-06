var express = require('express')
var router = express.Router()
const { getlist } = require('../middleware/article')
const { Send } = require('../utils')

/* GET users listing. */
router.get('/getlist', [getlist], function (req, res, next) {
  const { data } = req
  data ? res.json(Send({ data })) : res.json(Send({ code: 300 }))
})

module.exports = router
