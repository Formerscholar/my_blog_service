const db = require('../models')
const { randomToken, outtime } = require('../utils')

module.exports = {
  async userLogin(req, res, next) {
    const { username = '', password = '' } = req.body
    try {
      const data = await db.User.findOne({
        where: {
          username,
          password,
        },
        limit: 1,
      })
      data.update({
        token: randomToken(),
        outtime: new Date().getTime() + outtime,
      })
      req.data = data
    } catch (error) {
      req.data = error
    }
    next()
  },
}
