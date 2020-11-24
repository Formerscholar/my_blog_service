const db = require('../models')
const { updateInfo } = require('../redis/users')
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
      if (data) {
        const layTime = new Date().getTime() + outtime
        const outtimes = new Date(layTime).toUTCString()
        const token = randomToken()
        req.outtimes = layTime
        req.token = token
        res.cookie('id', data.id, {
          domain: 'localhost',
          secure: false,
          expires: outtimes,
          maxAge: outtime,
          httpOnly: true,
          signed: true,
        })
        res.cookie('token', token, {
          domain: 'localhost',
          secure: false,
          expires: outtimes,
          maxAge: outtime,
          httpOnly: true,
          signed: true,
        })
      }
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
      updateInfo({ id, username, email, nickname, uploadURL })
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
