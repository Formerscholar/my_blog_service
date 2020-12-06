const db = require('../models')
const { paging } = require('../utils')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  async getlist(req, res, next) {
    let { page = 1, CategoryId, title, id } = req.query
    ~~page < 1 ? 1 : ~~page
    let where = ~~CategoryId ? { CategoryId } : {}
    where = title
      ? {
          ...where,
          title: {
            [Op.like]: `%${title}%`,
          },
        }
      : { ...where }
    where = id
      ? {
          id,
        }
      : { ...where }
    try {
      const data = await db.Article.findAll({
        where,
        include: [
          {
            model: db.Category,
            attributes: ['id', 'name'],
          },
          {
            model: db.User,
            attributes: ['id', 'nickname', 'avatar', 'gender'],
          },
          {
            model: db.comment,
            attributes: ['id', 'content', 'userId', 'createdAt', 'updatedAt'],
            include: [
              {
                model: db.User,
                attributes: ['id', 'nickname', 'avatar', 'gender'],
              },
            ],
          },
        ],
        order: [['updatedAt', 'DESC']],
        offset: (page - 1) * paging,
        limit: paging,
      })
      req.data = data
    } catch (error) {
      req.data = error
    }
    next()
  },
  async addItem(req, res, next) {
    let { title, synopsis, content, CategoryId } = req.body
    try {
      const data = await db.Article.create({
        title,
        synopsis,
        content,
        CategoryId,
        UserId: req.signedCookies.id,
      })
      req.data = data
    } catch (error) {
      req.data = error
    }
    next()
  },
  async updateItem(req, res, next) {
    let { id, title, synopsis, content, CategoryId } = req.body
    try {
      const data = await db.Article.update(
        { title, synopsis, content, CategoryId },
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
  async deleteItem(req, res, next) {
    let { id } = req.query
    try {
      const data = await db.Article.destroy({
        where: {
          id,
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
