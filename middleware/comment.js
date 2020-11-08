const db = require('../models')
const { paging } = require('../utils')
const Sequelize = require('sequelize')
const { add } = require('./category')
const Op = Sequelize.Op

module.exports = {
  async ListbyArticleId(req, res, next) {
    let { ArticleId, page } = req.query
    ~~page < 1 ? 1 : ~~page
    let where = {
      ArticleId,
    }
    try {
      const list = await db.comment.findAll({
        where,
        order: [['updatedAt', 'DESC']],
        offset: (page - 1) * paging,
        limit: paging,
      })
      const total = await db.comment.count({
        where,
        distinct: true,
      })
      req.data = {
        total,
        list,
      }
    } catch (error) {
      req.data = error
    }
    next()
  },
  async add(req, res, next) {
    let { ArticleId, content, UserId } = req.body
    try {
      const data = await db.comment.create({
        ArticleId,
        content,
        UserId,
      })
      req.data = data
    } catch (error) {
      req.data = error
    }
    next()
  },
  async deleteItem(req, res, next) {
    let { id , UserId } = req.query
    try {
      const data = await db.comment.destroy({
        where: {
          id,
          UserId
        },
        limit: 1,
      })
      req.data = data
    } catch (error) {
      req.data = error
    }
    next()
  },
}
