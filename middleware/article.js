const db = require('../models')
const { paging } = require('../utils')

module.exports = {
  async getlist(req, res, next) {
    let { page = 1, CategoryId  } = req.query
    ~~page < 1 ? 1 : ~~page
    let where = ~~CategoryId ? { CategoryId } : {}
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
}
