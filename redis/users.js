const { get, set } = require('./index')
const { Send } = require('../utils')

const loginRedis = async (req, res, next) => {
  const { data } = req
  const redisData = await set('userData' + data.id, {
    email: data.email,
    nickname: data.nickname,
    avatar: data.avatar,
  })
  if (redisData != 'success') {
    res.json(Send({ code: 400, data: redisData, msg: '缓存错误' }))
  }
  next()
}

// ----- ↑ = middleware  ↓ = hookfunc -----

const updateInfo = async ({ id, username, email, nickname,uploadURL }) => {
  const redisData = await set('userData' + id, {
    email,
    nickname,
    avatar: uploadURL,
  })
  if (redisData != 'success') {
    res.json(Send({ code: 400, data: redisData, msg: '缓存错误' }))
  }
}

module.exports = {
  loginRedis,
  updateInfo
}
