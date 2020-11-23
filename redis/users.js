const { get, set } = require('./index')
const { Send } = require('../utils')

const loginRedis = async (req, res, next) => {
  const { data, outtimes, token } = req
  const redisData = await set(data.id, {
    email: data.email,
    nickname: data.nickname,
    avatar: data.avatar,
    token,
    outtimes,
  })
  if (redisData != 'success') {
    res.json(Send({ code: 400, data: redisData, msg: '缓存错误' }))
  } else {
  }
  next()
}

// ----- ↑ = middleware  ↓ = hookfunc -----

const updateInfo = async ({ id, username, email, nickname, uploadURL }) => {
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
  updateInfo,
}
