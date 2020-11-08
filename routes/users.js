var express = require('express')
var router = express.Router()
const { userLogin  , userRegister ,updateInfo} = require('../middleware/users')
const { Send } = require('../utils')

/* GET users listing. */
router.post('/login', [userLogin], function (req, res, next) {
  const { data } = req
  data
    ? res.json(Send({ data }))
    : res.json(Send({ code: 300, msg: '您未注册账号!' }))
})


router.post('/register', [userRegister], function (req, res, next) {
  const { data } = req
  data
    ? res.json(Send({ data }))
    : res.json(Send({ code: 300, msg: '注册失败!' }))
})


router.post('/updateinfo', [updateInfo], function (req, res, next) {
  const { data } = req
  data
    ? res.json(Send({ data }))
    : res.json(Send({ code: 300, msg: '更新信息失败!' }))
})

module.exports = router
