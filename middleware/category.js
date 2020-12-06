const db = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  async list(req, res, next) {
    try {
      const data = await db.Category.findAll({
        order: [['createdAt', 'DESC']],
      })
      req.data = data
    } catch (error) {
      req.data = error
    }
    next()
  },
  async add(req, res, next) {
    const { name } = req.body
    try {
      const data = await db.Category.create({
        name,
      })
      req.data = data
    } catch (error) {
      req.data = error
    }
    next()
  },
  async update(req, res, next) {
    const { id, name } = req.body
    try {
      const data = await db.Category.update(
        {
          name,
        },
        {
          where: {
            id,
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
  async delectCate(req, res, next) {
    const { id } = req.body
    const data = await db.Category.destroy({
      where: {
        id: id,
      },
      limit: 1,
    })
    req.data = data
    next()
  },
}
