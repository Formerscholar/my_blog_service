const { get, set } = require('./index')
const { Send } = require('../utils')

const loginRedis = (req, res, next) => {
  const { data } = req
  set('userData' + data.id, data)
    .then(() => {
      next()
    })
    .catch((err) => {
      res.json(Send({ code: 400, data: err, msg: '缓存错误' }))
    })
}

module.exports = {
  loginRedis,
}
