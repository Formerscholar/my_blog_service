const db = require('../models')
const { outtime } = require('../utils')
const { Send } = require('../utils')

module.exports = {
  async verificationToken(req, res, next) {
    const token = req.body.token || req.query.token
    try {
      const data = await db.User.findOne({
        where: {
          token,
        },
        limit: 1,
      })
      if (data && data.outtime > new Date().getTime()) {
        data.update({
          outtime: new Date().getTime() + outtime,
        })
        req.data = data
      } else {
        res.send(Send({ code: 777, data: 'token错误或登录过期' }))
      }
    } catch (error) {
      req.data = error
    }
    next()
  },
}
