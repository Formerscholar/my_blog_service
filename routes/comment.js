var express = require('express')
var router = express.Router()
const { ListbyArticleId ,add ,deleteItem } = require('../middleware/comment')
const { Send } = require('../utils')

/* GET users listing. */
router.get('/list', [ListbyArticleId], function (req, res, next) {
  const { data } = req
  data ? res.json(Send({ data })) : res.json(Send({ code: 300 }))
})

router.post('/add', [add], function (req, res, next) {
  const { data } = req
  data ? res.json(Send({ data })) : res.json(Send({ code: 300 }))
})

router.get('/delete', [deleteItem], function (req, res, next) {
  const { data } = req
  data ? res.json(Send({ data })) : res.json(Send({ code: 300 }))
})

module.exports = router
