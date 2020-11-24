const db = require('../models')
const { Send } = require('../utils')
const { get, set } = require('../redis')

module.exports = {
  async verificationToken(req, res, next) {
    const redisData = await get(req.signedCookies.id)
    if (redisData) {
      if (
        req.signedCookies.token === redisData.token &&
        redisData.outtimes > new Date().getTime()
      ) {
        next()
      } else {
        set(req.signedCookies.id, null)
        res.send(Send({ code: 777, data: 'cookie错误或登录过期' }))
      }
    } else {
      res.send(Send({ code: 777, data: 'cookie错误或登录过期' }))
    }
  },
}
