const db = require('../models')
const { Send } = require('../utils')
const { get } = require('../redis')

module.exports = {
  async verificationToken(req, res, next) {
    const redisData = await get(req.signedCookies.id)
    if (
      req.signedCookies.token === redisData.token &&
      redisData.outtimes > ~~(new Date().getTime() / 1000)
    ) {
      next()
    } else {
      res.send(Send({ code: 777, data: 'cookie错误或登录过期' }))
    }
  },
}
