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
  async userRegister(req, res, next) {
    const { username, password, email, nickname, avatar, gender } = req.body
    try {
      const data = await db.User.create({
        username,
        password,
        email,
        nickname,
        avatar,
        gender,
      })
      req.data = data
    } catch (error) {
      req.data = error
    }
    next()
  },
  async updateInfo(req, res, next) {
    const { id, username, email, nickname } = req.body
    const { uploadURL } = req
    try {
      const data = await db.User.update(
        {
          email,
          nickname,
          avatar: uploadURL,
        },
        {
          where: {
            id,
            username,
          },
          limit: 1,
        }
      )
      req.data = data
    } catch (error) {
      req.data = error
    }
    next()
  },
}
