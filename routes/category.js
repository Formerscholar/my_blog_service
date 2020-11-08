var express = require('express')
var router = express.Router()
const { list ,add ,update } = require('../middleware/category')
const { Send } = require('../utils')

/* GET users listing. */
router.get('/list', [list], function (req, res, next) {
  const { data } = req
  data ? res.json(Send({ data })) : res.json(Send({ code: 300 }))
})

router.post('/add', [add], function (req, res, next) {
  const { data } = req
  data ? res.json(Send({ data })) : res.json(Send({ code: 300 }))
})

router.post('/update', [update], function (req, res, next) {
  const { data } = req
  data ? res.json(Send({ data })) : res.json(Send({ code: 300 }))
})

module.exports = router
