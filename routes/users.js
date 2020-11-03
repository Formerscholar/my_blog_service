var express = require('express')
var router = express.Router()
const { userLogin } = require('../middleware/users')
const { Send } = require('../utils')

/* GET users listing. */
router.post('/login', [userLogin], function (req, res, next) {
  const { data } = req
  data
    ? res.json(Send({ data }))
    : res.json(Send({ code: 300, msg: '您未注册账号!' }))
})

module.exports = router
